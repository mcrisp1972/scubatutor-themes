import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'cwps/pullquote_block_supports',
	( props, name ) => {
		if ( name !== 'core/pullquote' ) {
			return props;
		}

		return {
			...props,
			supports: {
				...props.supports,
				align: null,
				spacing: {
					...props.supports?.spacing,
					margin: [ 'top', 'bottom' ],
					padding: [ 'left', 'right' ],
				},
			},
		};
	},
	900
);
