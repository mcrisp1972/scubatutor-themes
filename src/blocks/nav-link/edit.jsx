import { InspectorControls, useBlockProps, RichText, LinkControl } from '@wordpress/block-editor';
import { PanelBody, TextControl, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { LinkSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { link, title } = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );

	return (
		<div { ...useBlockProps( { className: 'wp-block-cwps-nav__menu-item' } ) }>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen={ true }>
					<TextControl
						label="Label"
						value={ title }
						onChange={ ( value ) => {
							setAttributes( { title: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<LinkSelect
						label="Link"
						value={ link }
						onChange={ ( value ) => {
							const newAttributes = { link: value };
							if ( ! title && value?.title ) {
								newAttributes.title = value?.title;
							}
							setAttributes( newAttributes );
						} }
						onRemove={ () => {
							return setAttributes( { link: {} } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ isLinkControlVisible && (
				<Popover
					position="middle center"
					variant="toolbar"
					onClose={ () => {
						return setIsLinkControlVisible( false );
					} }
				>
					<LinkControl
						searchInputPlaceholder="Search..."
						value={ link }
						settings={ [
							{
								id: 'opensInNewTab',
								title: 'New tab',
							},
						] }
						onChange={ ( value ) => {
							const newAttributes = { link: value };
							if ( ! title && value?.title ) {
								newAttributes.title = value?.title;
							}
							setAttributes( newAttributes );
						} }
						withCreateSuggestion={ false }
						onRemove={ () => {
							return setAttributes( { link: {} } );
						} }
					/>
				</Popover>
			) }
			<RichText
				className="wp-block-cwps-nav__menu-item-link"
				value={ title }
				allowedFormats={ [] }
				placeholder="Link Text..."
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
			/>
		</div>
	);
}
