import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import { photoLibrary } from '../../editor-icons';

registerBlockType( metadata, {
	icon: photoLibrary,
	edit: Edit,
	save: () => {
		return null;
	},
} );
