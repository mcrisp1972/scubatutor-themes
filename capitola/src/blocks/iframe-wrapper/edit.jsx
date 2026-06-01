import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import { PlaceholderIframe } from '../../editor-controls';

function isValidIframeHtml( html ) {
	const pattern = /<iframe[^>]*>([\s\S]*?)<\/iframe>/gm;
	return pattern.test( html );
}

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { aspectRatio, iframeHtml } = attributes;
	const blockProps = useBlockProps( { className: '--' + aspectRatio } );

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
					<SelectControl
						label="Aspect Ratio"
						value={ aspectRatio }
						options={ [
							{ label: '3:2', value: '3-2' },
							{ label: '4:3', value: '4-3' },
							{ label: '16:9', value: '16-9' },
						] }
						onChange={ ( value ) => {
							setAttributes( { aspectRatio: value } );
						} }
						__next40pxDefaultSize
					/>
				</PanelBody>
			</InspectorControls>
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
