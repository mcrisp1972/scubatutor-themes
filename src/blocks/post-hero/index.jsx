import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { dominoMask } from '../../editor-icons';
import Edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: dominoMask,
	edit: Edit,
	save: () => {
		return null;
	},
} );
