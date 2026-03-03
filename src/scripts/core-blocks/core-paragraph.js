import { addFilter } from '@wordpress/hooks';

// Adds alignment options to core paragraph block
addFilter(
	'blocks.registerBlockType',
	'capitola/paragraph_block_supports',
	( props, name ) => {
		if ( name !== 'core/paragraph' ) {
			return props;
		}

		const allowedVariations = props.variations?.filter( ( variation ) => {
			return variation.name !== 'stretchy-paragraph';
		} );

		return {
			...props,
			variations: allowedVariations,
			supports: {
				...props.supports,
				align: [ 'wide' ],
			},
		};
	},
	900
);
