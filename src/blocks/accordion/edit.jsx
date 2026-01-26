import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { keepOpen } = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Accordion Options" initialOpen={ true }>
					<ToggleControl
						label="Keep Items Open"
						checked={ keepOpen }
						onChange={ ( value ) => {
							setAttributes( { keepOpen: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: 'wp-block-cwps-accordion__list',
						'data-auto-collapse': keepOpen ? '1' : '0',
					},
					{
						defaultBlock: { name: 'cwps/accordion-item' },
						allowedBlocks: [ 'cwps/accordion-item' ],
						template: [ [ 'cwps/accordion-item' ] ],
						templateLock: false,
						directInsert: true,
					}
				) }
			/>
		</div>
	);
}
