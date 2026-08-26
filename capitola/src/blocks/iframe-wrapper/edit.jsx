import { InspectorControls, useBlockProps, BlockControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, ToolbarGroup } from '@wordpress/components';
import { PlaceholderIframe, RadiusToolbar, AspectRatioToolbar } from '@capitola/editor-controls';

function isValidIframeHtml( html ) {
	const pattern = /<iframe[^>]*>([\s\S]*?)<\/iframe>/gm;
	return pattern.test( html );
}

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { aspectRatio, radius, iframeHtml } = attributes;
	const blockProps = useBlockProps( {
		style: {
			aspectRatio: `var(--wp--preset--aspect-ratio--${ aspectRatio })`,
			borderRadius: `var(--wp--preset--border-radius--${ radius })`,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="iFrame Details" initialOpen={ true }>
					<TextareaControl
						label="Iframe HTML"
						value={ iframeHtml }
						onChange={ ( value ) => {
							setAttributes( { iframeHtml: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<AspectRatioToolbar
						props={ props }
						attribute="aspectRatio"
						options={ [ '16-9', '3-2', '4-3' ] }
					/>
					<RadiusToolbar
						props={ props }
						attribute="radius"
						options={ [ 'none', 'xsmall', 'small', 'medium', 'large' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ isValidIframeHtml( iframeHtml ) ? (
				<figure { ...blockProps } dangerouslySetInnerHTML={ { __html: iframeHtml } } />
			) : (
				<figure { ...blockProps }>
					<PlaceholderIframe />
				</figure>
			) }
		</>
	);
}
