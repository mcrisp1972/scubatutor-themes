/* eslint-disable jsx-a11y/iframe-has-title */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import {
	PanelBody,
	RadioControl,
	TextControl,
	ToggleControl,
	TextareaControl,
	ToolbarGroup,
	ResizableBox,
	RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	ImageSelect,
	ColorThemePanel,
	AnimationPanel,
	VerticalAlignToolbar,
	IntroAlignToolbar,
	AspectRatioToolbar,
	RadiusToolbar,
	VideoSelect,
	ImageFocalPoint,
} from '../../editor-controls';
import { Iframe } from './iframe';
import { Video } from './video';
import { Image } from './image';

export default function Edit( props ) {
	const { attributes, setAttributes, toggleSelection } = props;

	const {
		introAlign,
		mediaWidth,
		allowImageLayout,
		imageLayout,
		imageParallax,
		mediaType,
		sideImage,
		imageFocalPoint,
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

	const isMobile = useViewportMatch( 'medium', '<' );

	const [ tempWidth, setTempWidth ] = useState( null );

	const featuredImage = useSelect(
		( select ) => {
			return isHeroVariation
				? select( 'core/editor' ).getEditedPostAttribute( 'featured_media' )
				: undefined;
		},
		[ isHeroVariation ]
	);

	const imageObject = useSelect(
		( select ) => {
			if ( externalImage ) {
				return imageUrl ? { source_url: imageUrl } : undefined;
			}
			const imageId = sideImage.id ? sideImage.id : featuredImage;
			return imageId
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId )
				: undefined;
		},
		[ featuredImage, sideImage, externalImage, imageUrl ]
	);

	const imageRatioClass = imageLayout === 'inner' ? '--' + ( videoID ? '16-9' : imageRatio ) : '';

	const radiusClass =
		imageLayout === 'inner' && imageRadius ? ` --has-${ imageRadius }-radius` : '';

	const stickyClass =
		stickyImage && imageLayout === 'inner' && verticalAlign === 'top' ? ' --sticky' : '';

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-side-image__width ${
				imageLayout === 'full' ? 'alignfull --side-bg-img' : 'alignwide --inset-img'
			}
         --has-${ introAlign }-intro
        ${ verticalAlign === 'top' ? ' --align-top' : '' }`,
		},
		{
			template: [
				isHeroVariation
					? [ 'capitola/body-text', { isHeroVariation: true, headlineTag: 'h1' } ]
					: [ 'capitola/body-text' ],
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
								setAttributes( {
									sideImage: {
										id: value.id,
										source_url: value.url,
									},
								} );
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
					{ mediaType === 'video' &&
						videoSource !== 'local' &&
						videoSource !== 'remote' && (
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
								setAttributes( {
									videoObject: {
										id: value.id,
										source_url: value.url,
									},
								} );
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
					{ imageLayout === 'inner' && (
						<RangeControl
							label="Media Width (%)"
							value={ tempWidth || mediaWidth }
							onChange={ ( value ) => {
								setAttributes( { mediaWidth: value } );
							} }
							min={ 20 }
							max={ 50 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
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
					{ mediaType === 'image' && imageRatio !== 'full' && !! sideImage?.id && (
						<ImageFocalPoint
							value={ imageFocalPoint }
							image={ sideImage.id }
							onChange={ ( value ) => {
								setAttributes( { imageFocalPoint: value } );
							} }
							help="Set the image’s main focus point."
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
				<AnimationPanel
					props={ props }
					allowFigureReveal={ imageLayout === 'inner' ? true : false }
				/>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left' ] }
					/>
					{ imageLayout === 'inner' && (
						<VerticalAlignToolbar props={ props } attribute="verticalAlign" />
					) }
					{ imageLayout === 'inner' && (
						<RadiusToolbar props={ props } attribute="imageRadius" />
					) }
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
				<ResizableBox
					className={ 'wp-block-capitola-side-image__imagewrap' + stickyClass }
					size={ {
						width: isMobile ? '100%' : mediaWidth + '%',
					} }
					style={ {
						flexBasis: 'unset',
						'--capitola-flex-basis': mediaWidth + '%',
						position: stickyClass ? 'sticky' : 'relative',
					} }
					minWidth="20%"
					maxWidth={ isMobile ? '100%' : '50%' }
					enable={ {
						top: false,
						bottom: false,
						left:
							imageLayout === 'inner' && introAlign === 'left' && ! isMobile
								? true
								: false,
						right:
							imageLayout === 'inner' && introAlign === 'right' && ! isMobile
								? true
								: false,
					} }
					onResize={ ( event, direction, elt ) => {
						setTempWidth( parseInt( elt.style.width ) );
					} }
					onResizeStop={ ( event, direction, elt ) => {
						setAttributes( {
							mediaWidth: parseInt( elt.style.width ),
						} );
						setTempWidth( null );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					{ imageLayout === 'inner' ? (
						<figure className="wp-block-capitola-side-image__imageratio">
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
									style={ {
										position: 'relative',
										zIndex: 1,
									} }
									value={ imageCaption }
									allowedFormats={ [] }
									placeholder={ imageObject?.caption?.raw || 'Caption...' }
									onChange={ ( value ) => {
										setAttributes( {
											imageCaption: value,
										} );
									} }
								/>
							) }
						</figure>
					) : (
						<Image
							imageObject={ imageObject }
							props={ props }
							featuredImage={ featuredImage }
						/>
					) }
				</ResizableBox>
				{ children }
			</div>
		</div>
	);
}
