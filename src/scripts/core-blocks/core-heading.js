import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'cwps/heading_block_supports',
	( props, name ) => {
		if ( name !== 'core/heading' ) {
			return props;
		}

		return {
			...props,
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
