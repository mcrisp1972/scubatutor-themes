import { InspectorControls, useBlockProps, useInnerBlocksProps, RichText, LinkControl } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ImageSelect, LinkSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { link, title, headline, intro, imageId, linksPerColumn } = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );

	const imageObject = useSelect(
		( select ) => {
			return imageId ? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId ) : undefined;
		},
		[ imageId ]
	);

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
					<TextControl
						type="number"
						min="1"
						max="10"
						label="Links Per Column"
						value={ linksPerColumn }
						onChange={ ( value ) => {
							setAttributes( { linksPerColumn: parseInt( value ) } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ImageSelect
						label="Image"
						value={ imageId }
						onChange={ ( value ) => {
							setAttributes( { imageId: value.id } );
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
			<div className="wp-block-cwps-nav__menu-item-caret"></div>
			<div className="wp-block-cwps-nav-mega-nav__sub-menu">
				<div className="wp-block-cwps-nav-mega-nav__sub-menu-height">
					<div className="wp-block-cwps-nav-mega-nav__head">
						<RichText
							className="wp-block-cwps-nav-mega-nav__headline --hl-m"
							value={ headline }
							allowedFormats={ [] }
							placeholder="Headline..."
							onChange={ ( value ) => {
								setAttributes( { headline: value } );
							} }
						/>
						<RichText
							className="wp-block-cwps-nav-mega-nav__intro"
							value={ intro }
							placeholder="Intro..."
							onChange={ ( value ) => {
								setAttributes( { intro: value } );
							} }
						/>
					</div>
					<div
						{ ...useInnerBlocksProps(
							{
								className: 'wp-block-cwps-nav-mega-nav__sub-menu-items --row-limit-' + linksPerColumn,
							},
							{
								defaultBlock: { name: 'cwps/nav-sublink' },
								allowedBlocks: [ 'cwps/nav-sublink' ],
								directInsert: true,
							}
						) }
					/>
					{ !! imageObject && (
						<div className="wp-block-cwps-nav-mega-nav__image">
							<img src={ imageObject.source_url } alt="" />
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
