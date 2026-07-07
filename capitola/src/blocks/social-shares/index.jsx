import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { info } from '@capitola/editor-icons';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: info,
	edit: Edit,
	save: () => {
		return null;
	},
} );
