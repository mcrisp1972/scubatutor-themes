import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'capitola/heading_block_supports',
	( props, name ) => {
		if ( name !== 'core/heading' ) {
			return props;
		}

		const allowedVariations = props.variations?.filter( ( variation ) => {
			return variation.name !== 'stretchy-heading';
		} );

		return {
			...props,
			variations: allowedVariations,
			styles: [],
			supports: {
				...props.supports,
				align: [ 'wide' ],
				spacing: {
					...props.supports?.spacing,
					margin: [ 'top', 'bottom' ],
				},
			},
		};
	},
	900
);

// addFilter(
// 	'blocks.registerBlockType',
// 	'capitola/embed_block_supports',
// 	( props, name ) => {
// 		if ( name !== 'core/embed' ) {
// 			return props;
// 		}

// 		if ( name === 'core/embed' ) {
// 			const allowed = [
// 				'youtube',
// 				'spotify',
// 				'vimeo',
// 				'tiktok',
// 				'twitter',
// 				'facebook',
// 				'instagram',
// 				'pinterest',
// 				'bluesky',
// 			];

// 			const remainingArr = props.variations.filter( ( data ) => {
// 				return allowed.includes( data.name );
// 			} );

// 			return {
// 				...props,
// 				variations: remainingArr,
// 				supports: {
// 					...props.supports,
// 					align: [ 'wide', 'full' ],
// 				},
// 			};
// 		}
// 	},
// 	900
// );
