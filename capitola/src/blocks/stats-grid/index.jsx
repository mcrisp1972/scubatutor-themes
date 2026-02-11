import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { percentage } from '../../editor-icons';

registerBlockType( metadata, {
	icon: percentage,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
