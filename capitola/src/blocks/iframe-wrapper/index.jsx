import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { map } from '@capitola/editor-icons';
import { Edit } from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: map,
	edit: Edit,
	save: () => {
		return null;
	},
} );
