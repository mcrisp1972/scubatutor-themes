import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { title } = attributes;
	const maxColumns = 3;
	const columnBlockName = 'capitola/core-nav-meganav-column';
	const columnCount = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockCount( clientId );
		},
		[ clientId ]
	);

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-core-nav-meganav__sub-menu-items',
		},
		{
			defaultBlock: { name: columnBlockName },
			allowedBlocks: [ columnBlockName ],
			directInsert: true,
			renderAppender: columnCount < maxColumns ? InnerBlocks.ButtonBlockAppender : false,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen>
					<TextControl
						label="Label"
						value={ title }
						onChange={ ( value ) => {
							setAttributes( { title: value } );
						} }
						__next40pxDefaultSize
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				className="wp-block-navigation__label"
				value={ title }
				allowedFormats={ [] }
				placeholder="Link Text..."
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
			/>
			<div className="wp-block-capitola-core-nav-meganav__sub-menu is-open">
				<div className="wp-block-capitola-core-nav-meganav__sub-menu-height">
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</div>
	);
}
