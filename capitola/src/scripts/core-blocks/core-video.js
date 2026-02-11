import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'capitola/video_block_supports',
	( props, name ) => {
		if ( name !== 'core/video' ) {
			return props;
		}

		return {
			...props,
			supports: {
				...props.supports,
				align: [ 'wide', 'full' ],
				spacing: {
					...props.supports?.spacing,
					// padding is disabled in theme.json
					margin: [ 'top', 'bottom' ],
				},
			},
		};
	},
	900
);
