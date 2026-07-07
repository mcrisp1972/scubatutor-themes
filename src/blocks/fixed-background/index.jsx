import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { Edit } from './edit';
import { wallpaper } from '@capitola/editor-icons';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: wallpaper,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'capitola/bg-image-text' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.backgroundImage = attributes.desktopImage;
					return createBlock( 'capitola/bg-image-text', attributes, innerBlocks );
				},
			},
		],
	},
} );
