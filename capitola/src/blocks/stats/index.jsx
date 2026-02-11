import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { percentage } from '../../editor-icons';
import Edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: percentage,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
