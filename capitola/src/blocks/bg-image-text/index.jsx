import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { Edit } from './edit';
import { wallpaper } from '@capitola/editor-icons';
import './style.scss';

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
				blocks: [ 'capitola/fixed-background' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.mobileImage = attributes.backgroundImage;
					attributes.tabletImage = attributes.backgroundImage;
					attributes.desktopImage = attributes.backgroundImage;
					attributes.colorThemeBody = true;
					return createBlock( 'capitola/fixed-background', attributes, innerBlocks );
				},
			},
		],
	},
} );
