import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { panZoom } from '../../editor-icons';
import { Edit } from './edit';
import save from './save';

import './style.scss';

registerBlockType( metadata, {
	icon: panZoom,
	edit: Edit,
	save,
} );
