import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Notice } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

export const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;

	const blockProps = useBlockProps({
		className: 'wp-block-capitola-core-nav-meganav-column',
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-core-nav-meganav-column__inner',
		},
		{
			allowedBlocks: ['core/image', 'core/accordion'],
		},
	);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Site Editor navigation', 'capitola')} initialOpen />
			</InspectorControls>
			<div {...innerBlocksProps} />
		</div>
	);
};
