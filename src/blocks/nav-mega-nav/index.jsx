import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { verticalSplit } from '../../editor-icons';
import Edit from './edit';
import './style.scss';

registerBlockType( metadata, {
	icon: verticalSplit,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'cwps/nav-link' ],
				transform: ( attributes ) => {
					return createBlock( 'cwps/nav-link', attributes );
				},
			},
			{
				type: 'block',
				blocks: [ 'cwps/nav-dropdown' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'cwps/nav-dropdown', attributes, innerBlocks );
				},
			},
		],
	},
} );
