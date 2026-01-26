import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import { PlaceholderIframe } from '../../editor-controls';

function isValidIframeHtml( html ) {
	const pattern = /<iframe[^>]*>([\s\S]*?)<\/iframe>/gm;
	return pattern.test( html );
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { aspectRatio, iframeHtml } = attributes;

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
						__nextHasNoMarginBottom
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
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			{ isValidIframeHtml( iframeHtml ) ? (
				<figure
					{ ...useBlockProps( { className: '--' + aspectRatio } ) }
					dangerouslySetInnerHTML={ { __html: iframeHtml } }
				/>
			) : (
				<figure { ...useBlockProps( { className: '--' + aspectRatio } ) }>
					<PlaceholderIframe />
				</figure>
			) }
		</>
	);
}
