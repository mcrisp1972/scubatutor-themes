import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { AddChildButton } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { keepOpen } = attributes;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-accordion__list',
			'data-auto-collapse': keepOpen ? '1' : '0',
		},
		{
			defaultBlock: { name: 'capitola/accordion-item' },
			allowedBlocks: [ 'capitola/accordion-item' ],
			template: [ [ 'capitola/accordion-item' ] ],
			templateLock: false,
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Accordion Options" initialOpen={ true }>
					<ToggleControl
						label="Keep Items Open"
						checked={ keepOpen }
						onChange={ ( value ) => {
							setAttributes( { keepOpen: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<AddChildButton clientId={ clientId } label="Add Accordion Item" />
			<div { ...innerBlocksProps } />
		</div>
	);
}
