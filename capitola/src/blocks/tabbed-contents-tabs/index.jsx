import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { tabs } from '../../editor-icons';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: tabs,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
