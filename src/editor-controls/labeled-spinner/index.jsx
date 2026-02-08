import { BaseControl, Spinner, useBaseControlProps } from '@wordpress/components';

function LabeledSpinner( { label } ) {
	const { baseControlProps } = useBaseControlProps( { label, __nextHasNoMarginBottom: true } );

	return (
		<BaseControl { ...baseControlProps }>
			<div>
				<Spinner />
			</div>
		</BaseControl>
	);
}

export default LabeledSpinner;
