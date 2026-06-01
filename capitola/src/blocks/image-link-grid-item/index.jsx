import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { customLink } from '@wordpress/icons';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: customLink,
	edit: Edit,
	save: () => {
		return null;
	},
} );
