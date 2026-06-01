import { registerBlockType } from '@wordpress/blocks';
import { link } from '@wordpress/icons';
import metadata from './block.json';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: link,
	edit: Edit,
	save: () => {
		return null;
	},
} );
