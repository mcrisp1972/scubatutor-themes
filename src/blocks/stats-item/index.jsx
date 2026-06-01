import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import { percentage } from '../../editor-icons';

registerBlockType( metadata, {
	icon: percentage,
	edit: Edit,
	save: () => {
		return null;
	},
} );
