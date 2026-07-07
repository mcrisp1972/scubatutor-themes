import { registerBlockType, createBlock, getBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { viewCarousel } from '@capitola/editor-icons';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: viewCarousel,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'capitola/small-image-slider' ],
				transform: ( attributes, innerBlocks ) => {
					const defaultAttributes = getBlockType(
						'capitola/small-image-slider'
					).attributes;
					if ( attributes.revealAnimation.section === 'figure' ) {
						attributes.revealAnimation = defaultAttributes.revealAnimation.default;
					}
					attributes.aspectRatio = defaultAttributes.aspectRatio.default;
					return createBlock( 'capitola/small-image-slider', attributes, innerBlocks );
				},
			},
		],
	},
} );
