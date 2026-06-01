import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { plus } from '@wordpress/icons';

export function AddChildButton( { clientId, label = 'Add Item' } ) {
	const { insertBlock } = useDispatch( 'core/block-editor' );

	const insertedBlockName = useSelect(
		( select ) => {
			if ( ! clientId ) {
				return null;
			}

			const blockListSettings =
				select( 'core/block-editor' ).getBlockListSettings( clientId ) || {};
			const defaultBlock = blockListSettings.defaultBlock;

			return typeof defaultBlock === 'string' ? defaultBlock : defaultBlock?.name || null;
		},
		[ clientId ]
	);

	const onAddChild = () => {
		if ( ! insertedBlockName || ! clientId ) {
			return;
		}

		insertBlock( createBlock( insertedBlockName ), undefined, clientId );
	};

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ plus }
					onClick={ onAddChild }
					disabled={ ! clientId || ! insertedBlockName }
				>
					{ label }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}
