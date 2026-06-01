import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { cover } from '@wordpress/icons';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: cover,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
