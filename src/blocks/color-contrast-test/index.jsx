import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import { photoLibrary } from '@capitola/editor-icons';

registerBlockType( metadata, {
	icon: photoLibrary,
	edit: Edit,
	save: () => {
		return null;
	},
} );
