import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import { title } from '../../editor-icons';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: title,
	edit: Edit,
	save,
} );
