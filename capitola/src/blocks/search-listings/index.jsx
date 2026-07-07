import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { manageSearch } from '@capitola/editor-icons';
import metadata from './block.json';
import { Edit } from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: manageSearch,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
