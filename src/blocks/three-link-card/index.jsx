import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import { link } from '../../editor-icons';

registerBlockType( metadata, {
	icon: link,
	edit: Edit,
	save: () => {
		return null;
	},
} );
