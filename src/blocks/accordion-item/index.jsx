import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { crop169 } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata, {
	icon: crop169,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
