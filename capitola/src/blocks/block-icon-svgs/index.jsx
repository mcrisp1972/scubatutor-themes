import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import save from './save';
import { photoLibrary } from '@capitola/editor-icons';

registerBlockType( metadata, {
	icon: photoLibrary,
	edit: Edit,
	save,
} );
