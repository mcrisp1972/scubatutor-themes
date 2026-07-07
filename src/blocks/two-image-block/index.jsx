import { registerBlockType, getBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { mediaAndText } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';

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
				blocks: [ 'capitola/side-image' ],
				transform: ( attributes, innerBlocks ) => {
					attributes = {
						...attributes,
						sideImage: attributes.frontImage,
						showCaption: attributes.frontImageShowCaption,
						imageCaption: attributes.frontImageCaption,
						imageRadius: attributes.frontImageRadius,
					};
					return createBlock( 'capitola/side-image', attributes, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'capitola/three-image-block' ],
				transform: ( attributes, innerBlocks ) => {
					const defaultAttributes = getBlockType(
						'capitola/three-image-block'
					).attributes;
					attributes = {
						...attributes,
						rearImageHeight: defaultAttributes.rearImageHeight.default,
						rearImageWidth: defaultAttributes.rearImageWidth.default,
						frontImageHeight: defaultAttributes.frontImageHeight.default,
						frontImageWidth: defaultAttributes.frontImageWidth.default,
					};
					return createBlock( 'capitola/three-image-block', attributes, innerBlocks );
				},
			},
		],
	},
} );
