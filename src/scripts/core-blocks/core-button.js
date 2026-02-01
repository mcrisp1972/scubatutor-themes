import { addFilter } from '@wordpress/hooks';
import { registerBlockStyle } from '@wordpress/blocks';

addFilter(
	'blocks.registerBlockType',
	'capitola/button_block_supports',
	( props, name ) => {
		if ( name !== 'core/button' ) {
			return props;
		}

		return {
			...props,
			styles: [],
		};
	},
	900
);

registerBlockStyle( 'core/button', {
	name: 'primary',
	label: 'Primary',
	isDefault: true,
} );

registerBlockStyle( 'core/button', {
	name: 'secondary',
	label: 'Secondary',
} );

registerBlockStyle( 'core/button', {
	name: 'micro',
	label: 'Micro',
} );

registerBlockStyle( 'core/button', {
	name: 'tertiary',
	label: 'Tertiary',
} );
