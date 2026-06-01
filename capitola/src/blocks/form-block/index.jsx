import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { mediaAndText } from '@wordpress/icons';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: mediaAndText,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
