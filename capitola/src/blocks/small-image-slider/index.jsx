import { registerBlockType, getBlockType, createBlock } from '@wordpress/blocks';
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
				blocks: [ 'capitola/full-width-slider' ],
				transform: ( attributes, innerBlocks ) => {
					const defaultAttributes = getBlockType(
						'capitola/full-width-slider'
					).attributes;
					attributes.aspectRatio = defaultAttributes.aspectRatio.default;
					attributes.introAlign = defaultAttributes.introAlign.default;
					return createBlock( 'capitola/full-width-slider', attributes, innerBlocks );
				},
			},
		],
	},
} );
