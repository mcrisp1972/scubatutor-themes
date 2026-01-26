import { addFilter } from '@wordpress/hooks';
import { registerBlockStyle } from '@wordpress/blocks';

addFilter(
	'blocks.registerBlockType',
	'cwps/image_block_supports',
	( props, name ) => {
		if ( name !== 'core/image' ) {
			return props;
		}

		return {
			...props,
			styles: [],
			supports: {
				...props.supports,
				align: [ 'wide', 'full' ],
			},
		};
	},
	900
);

registerBlockStyle( 'core/image', {
	name: 'default',
	label: 'No Radius',
	isDefault: true,
} );

registerBlockStyle( 'core/image', {
	name: 'small-radius',
	label: 'Small Radius',
} );

registerBlockStyle( 'core/image', {
	name: 'medium-radius',
	label: 'Medium Radius',
} );

registerBlockStyle( 'core/image', {
	name: 'large-radius',
	label: 'Large Radius',
} );
