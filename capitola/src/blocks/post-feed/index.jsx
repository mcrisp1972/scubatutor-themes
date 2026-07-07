import {
	registerBlockType,
	createBlock,
	getBlockType,
	registerBlockVariation,
} from '@wordpress/blocks';
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
				blocks: [ 'capitola/featured-posts' ],
				transform: ( attributes, innerBlocks ) => {
					const featPostsDefaultAttributes =
						getBlockType( 'capitola/featured-posts' ).attributes;
					attributes.ctaText = featPostsDefaultAttributes.ctaText.default;
					return createBlock( 'capitola/featured-posts', attributes, innerBlocks );
				},
			},
		],
	},
} );

// regisrtering using js to ensure icon renders in transform dropdown.
registerBlockVariation( 'capitola/post-feed', {
	name: 'post-feed',
	title: 'Post Feed',
	icon: category,
	scope: [ 'transform' ],
	attributes: {
		postType: 'post',
		postCategory: [],
		orderBy: 'date',
		order: 'desc',
		showByline: false,
		ctaText: 'Read Article',
		futureOnly: false,
		orderingOptions: [
			{
				value: 'date',
				label: 'Date',
			},
			{
				value: 'title',
				label: 'Title',
			},
		],
	},
	isActive: [ 'postType' ],
} );
