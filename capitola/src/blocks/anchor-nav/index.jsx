import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { viewDay } from '../../editor-icons';
import metadata from './block.json';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: viewDay,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
