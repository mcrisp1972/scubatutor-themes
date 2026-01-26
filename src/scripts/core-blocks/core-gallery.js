import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'cwps/gallery_block_supports',
	( props, name ) => {
		if ( name !== 'core/gallery' ) {
			return props;
		}

		return {
			...props,
			styles: [],
			supports: {
				...props.supports,
				align: [ 'wide', 'full' ],
				spacing: {
					...props.supports?.spacing,
					margin: [ 'top', 'bottom' ],
				},
			},
		};
	},
	900
);
