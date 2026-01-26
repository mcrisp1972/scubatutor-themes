import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { photoLibrary } from '../../editor-icons';
import Edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: photoLibrary,
	edit: Edit,
	save: () => {
		return null;
	},
} );
