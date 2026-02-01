import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'capitola/embed_block_supports',
	( props, name ) => {
		if ( name !== 'core/embed' ) {
			return props;
		}

		if ( name == 'core/embed' ) {
			const allowed = [
				'youtube',
				'spotify',
				'vimeo',
				'tiktok',
				'twitter',
				'facebook',
				'instagram',
				'pinterest',
				'bluesky',
			];

			const remainingArr = props.variations.filter( ( data ) => {
				return allowed.includes( data.name );
			} );

			return {
				...props,
				variations: remainingArr,
				supports: {
					...props.supports,
					align: [ 'wide', 'full' ],
				},
			};
		}
	},
	900
);
