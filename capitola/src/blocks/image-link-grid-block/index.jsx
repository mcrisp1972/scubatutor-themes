import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { mediaAndText } from '@wordpress/icons';
import './style.scss';

registerBlockType( metadata, {
	icon: mediaAndText,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
