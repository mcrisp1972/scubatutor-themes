import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { gridView } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata, {
	icon: gridView,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
