import { registerBlockType } from '@wordpress/blocks';
import { bottomNavigation } from '@capitola/editor-icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: bottomNavigation,
	edit: Edit,
	save: () => {
		return null;
	},
} );
