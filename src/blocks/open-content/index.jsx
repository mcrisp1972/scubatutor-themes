import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { textFields } from '@capitola/editor-icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: textFields,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
