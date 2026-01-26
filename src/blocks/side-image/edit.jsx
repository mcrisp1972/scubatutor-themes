/* eslint-disable jsx-a11y/iframe-has-title */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	TextControl,
	ToggleControl,
	TextareaControl,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	ImageSelect,
	ImageAlignMatrix,
	ColorThemePanel,
	AnimationPanel,
	VerticalAlignToolbar,
	IntroAlignToolbar,
	AspectRatioToolbar,
	RadiusToolbar,
	VideoSelect,
} from '../../editor-controls';
import { Iframe } from './iframe';
import { Video } from './video';
import { Image } from './image';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		introAlign,
		allowImageLayout,
		imageLayout,
		imageParallax,
		mediaType,
		sideImage,
		imageCropPosition,
		iframeCode,
		externalImage,
		imageUrl,
		imageAlt,
		videoUrl,
		stickyImage,
		imageRatio,
		imageRadius,
		showCaption,
		imageCaption,
		verticalAlign,
		videoSource,
		videoID,
		videoObject,
		colorTheme,
		isHeroVariation,
	} = attributes;

	const featuredImage = useSelect(
		( select ) => {
			return isHeroVariation ? select( 'core/editor' ).getEditedPostAttribute( 'featured_media' ) : undefined;
		},
		[ isHeroVariation ]
	);

	const imageObject = useSelect(
		( select ) => {
			if ( externalImage ) {
				return imageUrl ? { source_url: imageUrl } : undefined;
			} else if ( ! isHeroVariation ) {
				return sideImage;
			}
			const imageId = sideImage.id ? sideImage.id : featuredImage;
			return imageId ? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId ) : undefined;
		},
		[ isHeroVariation, featuredImage, sideImage, externalImage, imageUrl ]
	);

	const imageRatioClass = imageLayout === 'inner' ? '--' + ( videoID ? '16-9' : imageRatio ) : '';

	const radiusClass = imageLayout === 'inner' && imageRadius ? ` --has-${ imageRadius }-radius` : '';

	const stickyClass = stickyImage && imageLayout === 'inner' && verticalAlign === 'top' ? ' --sticky' : '';

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-cwps-side-image__width ${
				imageLayout === 'full' ? 'alignfull --side-bg-img' : 'alignwide --inset-img'
			}
         --has-${ introAlign }-intro
        ${ verticalAlign === 'top' ? ' --align-top' : '' }`,
		},
		{
			template: [
				isHeroVariation
					? [ 'cwps/body-text', { isHeroVariation: true, headlineTag: 'h1' } ]
					: [ 'cwps/body-text' ],
			],
			templateLock: 'all',
		}
	);

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Media" initialOpen={ true }>
					{ mediaType === 'image' && (
						<ToggleControl
							label="External Image?"
							checked={ externalImage }
							onChange={ ( value ) => {
								setAttributes( { externalImage: value } );
							} }
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'image' && ! externalImage && (
						<ImageSelect
							label="Image"
							value={ sideImage.id }
							onChange={ ( value ) => {
								setAttributes( { sideImage: { id: value.id, source_url: value.url } } );
							} }
						/>
					) }
					{ mediaType === 'image' && externalImage && (
						<TextControl
							label="Image URL"
							value={ imageUrl }
							onChange={ ( value ) => {
								setAttributes( { imageUrl: value } );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'image' && externalImage && (
						<TextControl
							label="Image Alt Tag"
							value={ imageAlt }
							onChange={ ( value ) => {
								setAttributes( { imageAlt: value } );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'iframe' && (
						<TextareaControl
							label="Iframe Code"
							value={ iframeCode }
							onChange={ ( value ) => {
								setAttributes( { iframeCode: value } );
							} }
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'video' && (
						<RadioControl
							label="Video Source"
							selected={ videoSource }
							options={ [
								{ label: 'Local Hosted', value: 'local' },
								{ label: 'Remote URL', value: 'remote' },
								{ label: 'Youtube', value: 'youtube' },
								{ label: 'Vimeo', value: 'vimeo' },
							] }
							onChange={ ( value ) => {
								setAttributes( { videoSource: value } );
							} }
						/>
					) }
					{ mediaType === 'video' && videoSource !== 'local' && videoSource !== 'remote' && (
						<TextControl
							label="Video ID"
							value={ videoID }
							onChange={ ( value ) => {
								setAttributes( { videoID: value } );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'video' && videoSource === 'remote' && (
						<TextControl
							label="Video URL"
							value={ videoUrl }
							onChange={ ( value ) => {
								setAttributes( { videoUrl: value } );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'video' && videoSource === 'local' && (
						<VideoSelect
							label="Video"
							value={ videoObject }
							onChange={ ( value ) => {
								setAttributes( { videoObject: { id: value.id, source_url: value.url } } );
							} }
						/>
					) }
					{ imageLayout === 'inner' && (
						<ToggleControl
							label="Show Caption"
							checked={ showCaption }
							onChange={ ( value ) => {
								setAttributes( { showCaption: value } );
							} }
							__nextHasNoMarginBottom
						/>
					) }
					{ allowImageLayout && (
						<RadioControl
							label="Image Layout"
							selected={ imageLayout }
							options={ [
								{ label: 'Inner', value: 'inner' },
								{ label: 'Full', value: 'full' },
							] }
							onChange={ ( value ) => {
								setAttributes( { imageLayout: value } );
							} }
						/>
					) }
					{ imageLayout === 'full' && mediaType === 'image' && (
						<ToggleControl
							label="Parallax Scrolling"
							checked={ imageParallax }
							onChange={ ( value ) => {
								setAttributes( { imageParallax: value } );
							} }
							__nextHasNoMarginBottom
						/>
					) }
					{ mediaType === 'image' && (
						<ImageAlignMatrix
							label="Image Crop Position"
							value={ imageCropPosition }
							onChange={ ( value ) => {
								setAttributes( { imageCropPosition: value } );
							} }
						/>
					) }
					{ imageLayout === 'inner' && verticalAlign === 'top' && (
						<ToggleControl
							label="Sticky Image"
							checked={ stickyImage }
							onChange={ ( value ) => {
								setAttributes( { stickyImage: value } );
							} }
							help={ 'Sticky image will not work if scroll animations are set.' }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } allowFigureReveal={ imageLayout === 'inner' ? true : false } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar props={ props } attribute="introAlign" options={ [ 'right', 'left' ] } />
					{ imageLayout === 'inner' && <VerticalAlignToolbar props={ props } attribute="verticalAlign" /> }
					{ imageLayout === 'inner' && <RadiusToolbar props={ props } attribute="imageRadius" /> }
					{ imageLayout === 'inner' && mediaType === 'image' && (
						<AspectRatioToolbar
							props={ props }
							attribute="imageRatio"
							options={ [ '16-9', '3-2', '4-3', '1', 'full' ] }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps }>
				<div className={ 'wp-block-cwps-side-image__imagewrap' + stickyClass }>
					{ imageLayout === 'inner' ? (
						<figure className="wp-block-cwps-side-image__imageratio">
							{ mediaType === 'video' && (
								<Video
									videoObject={ videoObject }
									radiusClass={ radiusClass }
									props={ props }
									key={ videoUrl }
								/>
							) }
							{ mediaType === 'image' && (
								<Image
									imageObject={ imageObject }
									imageRatioClass={ imageRatioClass }
									radiusClass={ radiusClass }
									props={ props }
									featuredImage={ featuredImage }
								/>
							) }
							{ mediaType === 'iframe' && (
								<Iframe iframeCode={ iframeCode } radiusClass={ radiusClass } />
							) }
							{ imageLayout === 'inner' && showCaption && (
								<RichText
									tagName="figcaption"
									style={ { position: 'relative', zIndex: 1 } }
									value={ imageCaption }
									allowedFormats={ [] }
									placeholder={ imageObject?.caption?.raw || 'Caption...' }
									onChange={ ( value ) => {
										setAttributes( { imageCaption: value } );
									} }
								/>
							) }
						</figure>
					) : (
						<Image imageObject={ imageObject } props={ props } featuredImage={ featuredImage } />
					) }
				</div>
				{ children }
			</div>
		</div>
	);
}
