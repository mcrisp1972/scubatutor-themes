import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { shortText } from '@capitola/editor-icons';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: shortText,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
