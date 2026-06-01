import { LinkControl } from '@wordpress/block-editor';
import { BaseControl, useBaseControlProps } from '@wordpress/components';

export function LinkSelect( { label, value, onChange, onRemove } ) {
	const { baseControlProps } = useBaseControlProps( {
		label,
		className: 'capitola-sidebar-link-control',
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
