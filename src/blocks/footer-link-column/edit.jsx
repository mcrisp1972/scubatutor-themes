import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { LinkSelect } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { link, headline } = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-capitola-footer__menu',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-footer__menu-items',
		},
		{
			defaultBlock: { name: 'capitola/nav-sublink' },
			allowedBlocks: [ 'capitola/nav-sublink' ],
			template: [ [ 'capitola/nav-sublink' ] ],
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen={ true }>
					<TextControl
						label="Label"
						value={ headline }
						onChange={ ( value ) => {
							setAttributes( { headline: value } );
						} }
						__next40pxDefaultSize
					/>
					<LinkSelect
						label="Link"
						value={ link }
						onChange={ ( value ) => {
							const newAttributes = { link: value };
							if ( ! headline && value?.title ) {
								newAttributes.headline = value?.title;
							}
							setAttributes( newAttributes );
						} }
						onRemove={ () => {
							return setAttributes( { link: {} } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				className="wp-block-capitola-footer__top-link"
				value={ headline }
				allowedFormats={ [] }
				placeholder="Column Headline..."
				onChange={ ( value ) => {
					setAttributes( { headline: value } );
				} }
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
