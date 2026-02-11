import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { dynamicFeed } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata, {
	icon: dynamicFeed,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
