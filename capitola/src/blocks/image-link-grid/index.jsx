import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { datasetLinked } from '@capitola/editor-icons';
import { Edit } from './edit';

registerBlockType( metadata, {
	icon: datasetLinked,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
