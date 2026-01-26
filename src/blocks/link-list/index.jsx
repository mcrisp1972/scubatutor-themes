import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import { details } from '@wordpress/icons';
import './style.scss';

registerBlockType( metadata, {
	icon: details,
	edit: Edit,
	save: () => {
		return null;
	},
} );
