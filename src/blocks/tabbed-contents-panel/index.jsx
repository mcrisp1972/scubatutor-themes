import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { tab } from '../../editor-icons';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: tab,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
