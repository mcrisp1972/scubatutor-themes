import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { accordion } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: accordion,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
