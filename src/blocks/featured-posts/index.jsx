import { registerBlockType, createBlock, getBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { category } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: category,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'capitola/term-feed' ],
				transform: ( attributes, innerBlocks ) => {
					const termFeedDefaultAttributes =
						getBlockType( 'capitola/term-feed' ).attributes;
					attributes.ctaText = termFeedDefaultAttributes.ctaText.default;
					return createBlock( 'capitola/term-feed', attributes, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'capitola/post-feed' ],
				transform: ( attributes, innerBlocks ) => {
					const postFeedDefaultAttributes =
						getBlockType( 'capitola/post-feed' ).attributes;
					attributes.ctaText = postFeedDefaultAttributes.ctaText.default;
					return createBlock( 'capitola/post-feed', attributes, innerBlocks );
				},
			},
		],
	},
} );
