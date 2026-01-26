import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { mediaAndText } from '@wordpress/icons';
import metadata from './block.json';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: mediaAndText,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
