import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { manageSearch } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata, {
	icon: manageSearch,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
