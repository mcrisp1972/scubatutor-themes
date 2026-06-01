import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { tabList } from '@wordpress/icons';
import { Edit } from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: tabList,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
