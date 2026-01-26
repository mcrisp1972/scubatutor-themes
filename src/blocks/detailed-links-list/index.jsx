import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { eventList } from '../../editor-icons';
import Edit from './edit';

registerBlockType( metadata, {
	icon: eventList,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
