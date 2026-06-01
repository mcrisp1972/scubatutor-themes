import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { Edit } from './edit';
import { wallpaper } from '../../editor-icons';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: wallpaper,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
