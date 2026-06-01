import { BaseControl, Spinner, useBaseControlProps } from '@wordpress/components';

export function LabeledSpinner( { label } ) {
	const { baseControlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<div>
				<Spinner />
			</div>
		</BaseControl>
	);
}
