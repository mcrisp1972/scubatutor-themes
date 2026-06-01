import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { Edit } from './edit';
import { customLink } from '@wordpress/icons';

registerBlockType( metadata, {
	icon: customLink,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
