import { BaseControl, useBaseControlProps } from '@wordpress/components';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useState } from '@wordpress/element';

function GoogleMapControl( { mapsKey, label, value, onSelect } ) {
	const { isLoaded } = useLoadScript( {
		googleMapsApiKey: mapsKey,
		libraries: [ 'places' ],
	} );

	const center = value.address
		? { lat: Number( value.lat ), lng: Number( value.lng ) }
		: { lat: 35.278513, lng: -120.664829 };

	const [ autocomplete, setAutocomplete ] = useState( null );

	const { baseControlProps } = useBaseControlProps( {
		label,
		__nextHasNoMarginBottom: true,
	} );

	function onLoadAC( string ) {
		setAutocomplete( string );
	}

	return (
		<BaseControl { ...baseControlProps } className="capitola-map-control">
			{ ! isLoaded ? (
				<h1>Loading...</h1>
			) : (
				<GoogleMap
					mapContainerClassName="map-container"
					center={ center }
					zoom={ 10 }
					options={ {
						mapTypeControl: false,
						fullscreenControl: false,
						panControl: false,
						disableDefaultUI: true,
						zoomControl: true,
					} }
				>
					{ !! value && <Marker position={ center } /> }

					<Autocomplete
						onLoad={ onLoadAC }
						onPlaceChanged={ () => {
							const mapObject = {
								address: autocomplete.getPlace().formatted_address,
								lat: String( autocomplete.getPlace().geometry.location.lat() ),
								lng: String( autocomplete.getPlace().geometry.location.lng() ),
							};
							onSelect( mapObject );
						} }
						className="input-wrap"
					>
						<input
							type="text"
							className="components-text-control__input"
							placeholder={
								!! value && value.address ? value.address : 'Search for Address'
							}
							style={ {
								textOverflow: 'ellipses',
								position: 'relative',
							} }
						/>
					</Autocomplete>
				</GoogleMap>
			) }
		</BaseControl>
	);
}

export default GoogleMapControl;
