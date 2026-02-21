import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { label, anchor } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: 'wp-block-capitola-anchor-nav__item',
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Link Settings" initialOpen={ true }>
					<TextControl
						label="Label"
						value={ label }
						onChange={ ( value ) => {
							setAttributes( { label: value } );
						} }
					/>
					<TextControl
						label="Anchor ID"
						value={ anchor }
						onChange={ ( value ) => {
							setAttributes( { anchor: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				className="wp-block-capitola-anchor-nav__link"
				value={ label }
				placeholder="Link..."
				onChange={ ( value ) => {
					setAttributes( { label: value } );
				} }
			/>
		</div>
	);
}
