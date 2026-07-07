import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { viewColumn } from '@capitola/editor-icons';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: viewColumn,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
