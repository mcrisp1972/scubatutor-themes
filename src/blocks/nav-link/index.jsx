import { registerBlockType, createBlock } from '@wordpress/blocks';
import metadata from './block.json';
import { link } from '../../editor-icons';
import Edit from './edit';

registerBlockType( metadata, {
	icon: link,
	edit: Edit,
	save: () => {
		return null;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'cwps/nav-dropdown' ],
				transform: ( attributes ) => {
					return createBlock( 'cwps/nav-dropdown', attributes );
				},
			},
			{
				type: 'block',
				blocks: [ 'cwps/nav-mega-nav' ],
				transform: ( attributes ) => {
					return createBlock( 'cwps/nav-mega-nav', attributes );
				},
			},
		],
	},
} );
