import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { plus } from '@wordpress/icons';

export function AddGrandChildButton( { clientId, targetBlockName, label = 'Add Item' } ) {
	const { insertBlock } = useDispatch( 'core/block-editor' );

	const { targetClientId, insertedBlockName } = useSelect(
		( select ) => {
			if ( ! clientId || ! targetBlockName ) {
				return {
					targetClientId: null,
					insertedBlockName: null,
				};
			}

			const blockEditorSelect = select( 'core/block-editor' );
			const targetId =
				blockEditorSelect.getBlock( clientId )?.innerBlocks?.find( ( childBlock ) => {
					return childBlock.name === targetBlockName;
				} )?.clientId || null;
			const defaultBlock = targetId
				? blockEditorSelect.getBlockListSettings( targetId )?.defaultBlock
				: null;

			return {
				targetClientId: targetId,
				insertedBlockName:
					typeof defaultBlock === 'string' ? defaultBlock : defaultBlock?.name || null,
			};
		},
		[ clientId, targetBlockName ]
	);

	const onAddChild = () => {
		if ( ! insertedBlockName || ! targetClientId ) {
			return;
		}

		insertBlock( createBlock( insertedBlockName ), undefined, targetClientId );
	};

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ plus }
					onClick={ onAddChild }
					disabled={ ! insertedBlockName || ! targetClientId }
				>
					{ label }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}
