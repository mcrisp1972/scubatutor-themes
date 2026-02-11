import { registerBlockType } from '@wordpress/blocks';
import { crop169 } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata, {
	icon: crop169,
	edit: Edit,
	save: () => {
		return null;
	},
} );
