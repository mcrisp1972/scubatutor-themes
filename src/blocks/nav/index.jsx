import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { Edit } from './edit';
import { header } from '@wordpress/icons';
import './style.scss';
import './editor.scss';

registerBlockType( metadata, {
	icon: header,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
