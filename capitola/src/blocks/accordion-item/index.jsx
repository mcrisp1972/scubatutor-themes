import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { accordionItem } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: accordionItem,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
