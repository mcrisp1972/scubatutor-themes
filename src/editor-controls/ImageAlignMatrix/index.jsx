import { BaseControl, useBaseControlProps, AlignmentMatrixControl } from '@wordpress/components';

function ImageAlignMatrix( { label, value, onChange } ) {
	const { baseControlProps } = useBaseControlProps( { label, __nextHasNoMarginBottom: true } );

	return (
		<BaseControl { ...baseControlProps }>
			<AlignmentMatrixControl
				label="Image Alignment"
				value={ value }
				onChange={ ( value ) => {
					onChange( value );
				} }
			/>
		</BaseControl>
	);
}
export default ImageAlignMatrix;
