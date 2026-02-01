// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { LinkControl } from '@wordpress/block-editor';
import { BaseControl, useBaseControlProps } from '@wordpress/components';

function LinkSelect( { label, value, onChange, onRemove } ) {
	const { baseControlProps } = useBaseControlProps( {
		label,
		className: 'capitola-sidebar-link-control',
		__nextHasNoMarginBottom: true,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<LinkControl
				searchInputPlaceholder="Search..."
				value={ value }
				settings={ [
					{
						id: 'opensInNewTab',
						title: 'New tab',
					},
				] }
				onChange={ onChange }
				withCreateSuggestion={ false }
				onRemove={ onRemove }
			/>
		</BaseControl>
	);
}

export default LinkSelect;
