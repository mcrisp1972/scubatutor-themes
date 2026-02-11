import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { link } from '../../editor-icons';
import Edit from './edit';

registerBlockType( metadata, {
	icon: link,
	edit: Edit,
	save: () => {
		return null;
	},
} );
