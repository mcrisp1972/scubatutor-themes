import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { developerGuide } from '../../editor-icons';
import Edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: developerGuide,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
