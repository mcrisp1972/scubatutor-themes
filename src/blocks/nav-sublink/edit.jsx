import { InspectorControls, useBlockProps, RichText, LinkControl } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { PanelBody, TextControl, Popover } from '@wordpress/components';
import { Platform, useState } from '@wordpress/element';
import { LinkSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace, clientId } = props;
	const { link, title } = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Link Options" initialOpen={ true }>
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
				className="wp-block-capitola-nav-sublink__link"
				value={ title }
				allowedFormats={ [] }
				placeholder="Link Text..."
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
				onSplit={ ( value, isOriginal ) => {
					let block;
					if ( isOriginal ) {
						block = createBlock( 'capitola/nav-sublink', {
							...attributes,
						} );
						block.clientId = clientId;
					} else {
						block = createBlock( 'capitola/nav-sublink' );
					}
					return block;
				} }
				onReplace={ onReplace }
				{ ...( Platform.isNative && { deleteEnter: true } ) }
			/>
		</div>
	);
}
