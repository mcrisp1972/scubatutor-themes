import { useState, useEffect, useRef } from '@wordpress/element';
import {
	BaseControl,
	useBaseControlProps,
	ComboboxControl,
	TextControl,
} from '@wordpress/components';
import { Icon, closeSmall, mapMarker } from '@wordpress/icons';

const GoogleMapControl = ( { label, value, onChange, mapsKey, help } ) => {
	const initialAddress =
		typeof value === 'object' && value !== null ? value.address || '' : value || '';
	const parsedLat = typeof value === 'object' && value !== null ? parseFloat( value.lat ) : NaN;
	const parsedLng = typeof value === 'object' && value !== null ? parseFloat( value.lng ) : NaN;
	const initialLatLng =
		! isNaN( parsedLat ) && ! isNaN( parsedLng ) ? { lat: parsedLat, lng: parsedLng } : null;
	const [ address, setAddress ] = useState( initialAddress );
	const [ latLng, setLatLng ] = useState( initialLatLng );
	const [ mapLoaded, setMapLoaded ] = useState( !! window.google?.maps );
	const [ options, setOptions ] = useState( [] );
	const mapRef = useRef( null );
	const markerInstance = useRef( null );
	const autocompleteService = useRef( null );

	const { baseControlProps } = useBaseControlProps( {
		className: 'capitola-map-control',
		label,
		help,
		__nextHasNoMarginBottom: true,
	} );

	// Initialize Google Places AutocompleteService
	useEffect( () => {
		if ( window.google?.maps?.places && ! autocompleteService.current ) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService();
		}
	}, [ mapLoaded ] );

	// Load Google Maps script
	useEffect( () => {
		if ( ! mapsKey || window.google?.maps ) {
			return;
		}
		const script = document.createElement( 'script' );
		script.src = `https://maps.googleapis.com/maps/api/js?key=${ mapsKey }&libraries=places`;
		script.async = true;
		script.onload = () => {
			return setMapLoaded( true );
		};
		document.body.appendChild( script );
		return () => {
			document.body.removeChild( script );
		};
	}, [ mapsKey ] );

	// Geocode address
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

	// Update map when latLng changes
	useEffect( () => {
		if ( ! window.google?.maps || ! mapRef.current || ! mapLoaded || ! latLng ) {
			return;
		}
		mapRef.current.innerHTML = '';
		const map = new window.google.maps.Map( mapRef.current, {
			center: latLng,
			zoom: 15,
			disableDefaultUI: true,
		} );
		markerInstance.current = new window.google.maps.Marker( {
			position: latLng,
			map,
		} );
		return () => {
			if ( markerInstance.current ) {
				markerInstance.current.setMap( null );
				markerInstance.current = null;
			}
		};
	}, [ latLng, mapLoaded ] );

	// Geocode on initial load only (if address exists but no latLng yet)
	useEffect( () => {
		if ( address && ! latLng && mapLoaded ) {
			geocodeAddress( address );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ mapLoaded ] );

	return (
		<BaseControl { ...baseControlProps }>
			<div className="capitola-map-control__fields">
				{ latLng ? (
					<>
						<TextControl
							className="capitola-map-control__address-input"
							value={ address }
							readOnly
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<button
							className="capitola-map-control__clear-button"
							type="button"
							aria-label="Clear address"
							onClick={ () => {
								if ( onChange ) {
									onChange( { address: '', lat: '', lng: '' } );
								}
								setAddress( '' );
								setLatLng( null );
							} }
						>
							<Icon icon={ closeSmall } />
						</button>
					</>
				) : (
					<ComboboxControl
						className="capitola-map-control__address-input"
						value={ null }
						options={ options }
						onChange={ ( selectedValue ) => {
							if ( selectedValue ) {
								setAddress( selectedValue );
								geocodeAddress( selectedValue );
							}
						} }
						onFilterValueChange={ ( filterValue ) => {
							setAddress( filterValue );
							if ( onChange ) {
								onChange( { address: filterValue, lat: '', lng: '' } );
							}
							if ( autocompleteService.current && filterValue ) {
								autocompleteService.current.getPlacePredictions(
									{ input: filterValue },
									( predictions ) => {
										setOptions(
											( predictions || [] ).map( ( s ) => {
												return {
													value: s.description,
													label: s.description,
												};
											} )
										);
									}
								);
							} else {
								setOptions( [] );
							}
						} }
						placeholder="Enter address..."
					/>
				) }
			</div>
			<div className="capitola-map-control__map-outer-wrap">
				<div className="capitola-map-control__map-wrap" ref={ mapRef } style={{display: latLng ? 'block' : 'none' }}/>
				{ ! latLng && (
					<div className="capitola-map-control__map-placeholder">
						<Icon icon={ mapMarker } size={ '50%' } />
					</div>
				) }
			</div>
		</BaseControl>
	);
};

export default GoogleMapControl;
