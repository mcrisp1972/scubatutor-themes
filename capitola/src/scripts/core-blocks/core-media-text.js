import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'capitola/media-text_block_supports',
	( props, name ) => {
		if ( name !== 'core/media-text' ) {
			return props;
		}

		return {
			...props,
			supports: {
				...props.supports,
				spacing: {
					...props.supports?.spacing,
					margin: [ 'top', 'bottom' ],
				},
			},
		};
	},
	900
);
