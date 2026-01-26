import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'cwps/quote_block_supports',
	( props, name ) => {
		if ( name == 'core/quote' ) {
			return Object.assign( {}, props, {
				styles: [],
				supports: {
					...props.supports,
					...{
						align: null,
					},
				},
			} );
		}
		return props;
	},
	900
);
