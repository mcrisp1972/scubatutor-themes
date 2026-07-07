import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { Edit } from './edit';
import { toggleOn } from '@capitola/editor-icons';

registerBlockType( metadata, {
	icon: toggleOn,
	edit: Edit,
	save: () => {
		return null;
	},
} );
