import { useState, useEffect, useRef } from '@wordpress/element';
import {
	BaseControl,
	useBaseControlProps,
	ComboboxControl,
	Button,
	Flex,
} from '@wordpress/components';
import { Icon, closeSmall, mapMarker } from '@wordpress/icons';

export function GoogleMapControl( { label, value, onChange, mapsKey, help } ) {
	// Parse the initial value — supports both string and { address, lat, lng } object formats.
	const initialAddress =
		typeof value === 'object' && value !== null ? value.address || '' : value || '';
	const parsedLat = typeof value === 'object' && value !== null ? parseFloat( value.lat ) : NaN;
	const parsedLng = typeof value === 'object' && value !== null ? parseFloat( value.lng ) : NaN;
	const initialLatLng =
		! isNaN( parsedLat ) && ! isNaN( parsedLng ) ? { lat: parsedLat, lng: parsedLng } : null;

	const [ address, setAddress ] = useState( initialAddress ); // Current address string.
	const [ latLng, setLatLng ] = useState( initialLatLng ); // Resolved coordinates, null if unresolved.
	const [ mapLoaded, setMapLoaded ] = useState( !! window.google?.maps ); // Whether the Maps JS SDK is ready.
	const [ options, setOptions ] = useState( [] ); // Autocomplete dropdown options.

	const mapRef = useRef( null ); // DOM element for the rendered map.
	const markerInstance = useRef( null ); // Current AdvancedMarkerElement instance.
	const predictionsRef = useRef( [] ); // Stores predictions from the new API so we can resolve the selected one.
	const useLegacyRef = useRef( false ); // Flipped to true if the new Places API returns a 403; stays true for the session.
	const legacyServiceRef = useRef( null ); // Lazily-initialized legacy AutocompleteService instance.

	const { baseControlProps } = useBaseControlProps( {
		className: 'capitola-map-control',
		label,
		help,
	} );

	// Load the Google Maps JS SDK if it hasn't been loaded yet.
	// Includes the 'places' library (autocomplete) and 'marker' library (AdvancedMarkerElement).
	useEffect( () => {
		if ( ! mapsKey || window.google?.maps ) {
			return;
		}
		const script = document.createElement( 'script' );
		script.src = `https://maps.googleapis.com/maps/api/js?key=${ mapsKey }&libraries=places,marker`;
		script.async = true;
		script.onload = () => {
			return setMapLoaded( true );
		};
		document.body.appendChild( script );
		return () => {
			document.body.removeChild( script );
		};
	}, [ mapsKey ] );

	// Resolve a selected autocomplete prediction to lat/lng coordinates.
	// Uses the new Places API: prediction.toPlace() → place.fetchFields().
	// This avoids a separate Geocoder call since we already have the prediction object.
	const resolvePlace = async ( prediction, addr ) => {
		try {
			const place = prediction.toPlace();
			await place.fetchFields( { fields: [ 'location' ] } );
			const loc = place.location;
			const newLatLng = { lat: loc.lat(), lng: loc.lng() };
			setLatLng( newLatLng );
			if ( onChange ) {
				onChange( {
					address: addr,
					lat: String( newLatLng.lat ),
					lng: String( newLatLng.lng ),
				} );
			}
		} catch {
			setLatLng( null );
			if ( onChange ) {
				onChange( { address: addr, lat: '', lng: '' } );
			}
		}
	};

	// Geocode an address string to lat/lng using the legacy Geocoder API.
	// Used as a fallback in two cases:
	// 1. On initial load when an address is saved but we have no prediction object.
	// 2. When a user selects a suggestion from the legacy AutocompleteService
	// (which doesn't support toPlace()).
	const geocodeAddress = ( addr ) => {
		if ( ! window.google?.maps ) {
			return;
		}
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode( { address: addr }, ( results, status ) => {
			if ( status === 'OK' && results[ 0 ] ) {
				const loc = results[ 0 ].geometry.location;
				const newLatLng = { lat: loc.lat(), lng: loc.lng() };
				setLatLng( newLatLng );
				if ( onChange ) {
					onChange( {
						address: addr,
						lat: String( newLatLng.lat ),
						lng: String( newLatLng.lng ),
					} );
				}
			} else {
				setLatLng( null );
				if ( onChange ) {
					onChange( { address: addr, lat: '', lng: '' } );
				}
			}
		} );
	};

	// Render / update the map and marker whenever coordinates change.
	// Uses AdvancedMarkerElement (requires the 'marker' library and a mapId).
	useEffect( () => {
		if ( ! window.google?.maps || ! mapRef.current || ! mapLoaded || ! latLng ) {
			return;
		}

		// Clear previous map content before re-rendering.
		mapRef.current.innerHTML = '';

		const map = new window.google.maps.Map( mapRef.current, {
			center: latLng,
			zoom: 15,
			disableDefaultUI: true,
			mapId: 'capitola-map-control', // Required for AdvancedMarkerElement.
		} );

		markerInstance.current = new window.google.maps.marker.AdvancedMarkerElement( {
			position: latLng,
			map,
		} );

		// Cleanup: detach marker from map on unmount / re-render.
		return () => {
			if ( markerInstance.current ) {
				markerInstance.current.map = null;
				markerInstance.current = null;
			}
		};
	}, [ latLng, mapLoaded ] );

	// On initial mount, if we have a saved address but no coordinates yet,
	// geocode it so the map renders immediately for returning users.
	useEffect( () => {
		if ( address && ! latLng && mapLoaded ) {
			geocodeAddress( address );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ mapLoaded ] );

	//  Legacy autocomplete fallback using the deprecated AutocompleteService.
	//  Activated when the new Places API (AutocompleteSuggestion) is unavailable
	//  or returns a 403 ("Places API (New)" not enabled in Google Cloud Console).
	//  Note: predictions from this API don't support toPlace(), so selected
	//  suggestions are resolved via geocodeAddress() instead of resolvePlace().
	const fetchSuggestionsLegacy = ( input ) => {
		if ( ! window.google?.maps?.places ) {
			setOptions( [] );
			return;
		}

		// Lazily initialize the service — reused across calls.
		if ( ! legacyServiceRef.current ) {
			legacyServiceRef.current = new window.google.maps.places.AutocompleteService();
		}

		legacyServiceRef.current.getPlacePredictions( { input }, ( predictions ) => {
			// Clear new-API predictions so onChange falls through to geocodeAddress().
			predictionsRef.current = [];
			setOptions(
				( predictions || [] ).map( ( s ) => {
					return {
						value: s.description,
						label: s.description,
					};
				} )
			);
		} );
	};

	//  Fetch autocomplete suggestions as the user types.
	//  Strategy:
	//  1. Try the new AutocompleteSuggestion API (requires "Places API (New)" enabled).
	//  2. If it fails (403) or isn't available, flip useLegacyRef and fall back to
	//     the deprecated AutocompleteService for the rest of the session.
	//  3. Subsequent calls skip straight to legacy without retrying the new API.
	const fetchSuggestions = async ( input ) => {
		if ( ! input ) {
			setOptions( [] );
			predictionsRef.current = [];
			return;
		}

		// Skip straight to legacy if the new API previously failed or isn't present.
		if ( useLegacyRef.current || ! window.google?.maps?.places?.AutocompleteSuggestion ) {
			fetchSuggestionsLegacy( input );
			return;
		}

		try {
			const { suggestions } =
				await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
					{ input }
				);

			// Each suggestion wraps a placePrediction — extract them.
			const predictions = suggestions
				.filter( ( s ) => {
					return s.placePrediction;
				} )
				.map( ( s ) => {
					return s.placePrediction;
				} );

			// Store predictions so we can call toPlace() on the selected one later.
			predictionsRef.current = predictions;

			setOptions(
				predictions.map( ( p ) => {
					return {
						value: p.text.text,
						label: p.text.text,
					};
				} )
			);
		} catch {
			// New API failed (likely 403 — "Places API (New)" not enabled).
			// Switch to legacy permanently for this session to avoid repeated failures.
			useLegacyRef.current = true;
			fetchSuggestionsLegacy( input );
		}
	};

	return (
		<BaseControl { ...baseControlProps }>
			<div className="capitola-map-control__fields">
				{ latLng ? (
					<Flex className="capitola-map-control__readonly" gap="8px">
						<span className="capitola-map-control__readonly-text">{ address }</span>
						<Button
							className="capitola-map-control__clear-button"
							icon={ closeSmall }
							size="small"
							label="Clear address"
							onClick={ () => {
								if ( onChange ) {
									onChange( { address: '', lat: '', lng: '' } );
								}
								setAddress( '' );
								setLatLng( null );
							} }
							__next40pxDefaultSize
						/>
					</Flex>
				) : (
					<ComboboxControl
						className="capitola-map-control__address-input"
						value={ value?.address }
						options={ options }
						onChange={ ( selectedValue ) => {
							// Fired when the user picks a suggestion from the dropdown.
							if ( selectedValue ) {
								setAddress( selectedValue );

								// If we have a new-API prediction, resolve via toPlace().
								// Otherwise fall back to Geocoder (legacy path).
								const prediction = predictionsRef.current.find( ( p ) => {
									return p.text.text === selectedValue;
								} );
								if ( prediction ) {
									resolvePlace( prediction, selectedValue );
								} else {
									geocodeAddress( selectedValue );
								}
							}
						} }
						onFilterValueChange={ ( filterValue ) => {
							// Fired on every keystroke — update address and fetch suggestions.
							setAddress( filterValue );
							if ( onChange ) {
								onChange( { address: filterValue, lat: '', lng: '' } );
							}
							fetchSuggestions( filterValue );
						} }
						placeholder="Enter address..."
					/>
				) }
			</div>
			<div className="capitola-map-control__map-outer-wrap">
				<div
					className="capitola-map-control__map-wrap"
					ref={ mapRef }
					style={ { display: latLng ? 'block' : 'none' } }
				/>
				{ ! latLng && (
					<div className="capitola-map-control__map-placeholder">
						<Icon icon={ mapMarker } size={ '50%' } />
					</div>
				) }
			</div>
		</BaseControl>
	);
}
