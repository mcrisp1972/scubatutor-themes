import { BaseControl, useBaseControlProps, FocalPointPicker } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function parseFocalPoint( value ) {
	if ( ! value ) {
		return { x: 0, y: 0 };
	}
	const [ xStr, yStr ] = value.split( ' ' );
	const x = parseFloat( xStr ) / 100;
	const y = parseFloat( yStr ) / 100;
	return { x, y };
}

function focalPointToString( obj ) {
	if ( ! obj || typeof obj.x !== 'number' || typeof obj.y !== 'number' ) {
		return '0% 0%';
	}
	const x = Math.round( obj.x * 100 ) + '%';
	const y = Math.round( obj.y * 100 ) + '%';
	return `${ x } ${ y }`;
}

export function ImageFocalPoint( { value, image, onChange, label = 'Image focal point', help } ) {
	const imageUrl = useSelect(
		( select ) => {
			if ( typeof image === 'number' ) {
				return select( 'core' ).getEntityRecord( 'postType', 'attachment', image )
					?.source_url;
			}
			return image;
		},
		[ image ]
	);

	const { baseControlProps } = useBaseControlProps( {
		label,
		help,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<FocalPointPicker
				url={ imageUrl }
				value={ parseFocalPoint( value ) }
				onChange={ ( newValue ) => {
					onChange( focalPointToString( newValue ) );
				} }
				onDrag={ ( newValue ) => {
					onChange( focalPointToString( newValue ) );
				} }
			/>
		</BaseControl>
	);
}
