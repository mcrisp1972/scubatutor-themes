import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { mediaAndText } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: mediaAndText,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'capitola/two-image-block' ],
				transform: ( attributes, innerBlocks ) => {
					attributes = {
						...attributes,
						frontImage: attributes.sideImage,
						frontImageShowCaption: attributes.showCaption,
						frontImageCaption: attributes.imageCaption,
						frontImageRadius: attributes.imageRadius,
					};
					return createBlock( 'two-image-block', attributes, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'capitola/three-image-block' ],
				transform: ( attributes, innerBlocks ) => {
					attributes = {
						...attributes,
						frontImage: attributes.sideImage,
						frontImageShowCaption: attributes.showCaption,
						frontImageCaption: attributes.imageCaption,
						frontImageRadius: attributes.imageRadius,
					};
					return createBlock( 'three-image-block', attributes, innerBlocks );
				},
			},
		],
	},
} );
