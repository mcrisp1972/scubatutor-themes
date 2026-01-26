import {
	InspectorControls,
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Spinner, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	ImageSelect,
	CtaControl,
	PlaceholderImage,
	TagSelect,
	ImageAlignMatrix,
	OverlayOpacitySlider,
	JustifyToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		introAlign,
		backgroundImage,
		imageOpacity,
		imageCropPosition,
		imageParallax,
		eyebrow,
		headline,
		eyebrowTag,
		headlineTag,
		cta,
		cta2,
		isHeroVariation,
	} = attributes;

	const featuredImageId = ! isHeroVariation
		? 0
		: useSelect( ( select ) => {
				return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
		  }, [] );

	const imageObject = useSelect(
		( select ) => {
			if ( backgroundImage.source_url ) {
				return backgroundImage;
			}
			const imageId = backgroundImage.id ? backgroundImage.id : isHeroVariation ? featuredImageId : false;
			return imageId ? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId ) : undefined;
		},
		[ backgroundImage, isHeroVariation, featuredImageId ]
	);

	const postTitle = useSelect(
		( select ) => {
			return isHeroVariation ? select( 'core/editor' ).getEditedPostAttribute( 'title' ) : false;
		},
		[ isHeroVariation ]
	);

	return (
		<div
			{ ...useBlockProps( {
				className: 'alignfull --theme-image-overlay ' + ( isHeroVariation ? '--hero-height' : '' ),
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Image Settings" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ backgroundImage.id }
						onChange={ ( value ) => {
							setAttributes( { backgroundImage: { id: value.id, source_url: value.url } } );
						} }
					/>
					<ImageAlignMatrix
						label="Image Crop Position"
						value={ imageCropPosition }
						onChange={ ( value ) => {
							setAttributes( { imageCropPosition: value } );
						} }
					/>
					<OverlayOpacitySlider
						value={ imageOpacity }
						onChange={ ( value ) => {
							setAttributes( { imageOpacity: value } );
						} }
					/>
					<ToggleControl
						label="Parallax Scrolling"
						checked={ imageParallax }
						onChange={ ( value ) => {
							setAttributes( { imageParallax: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Markup" initialOpen={ false }>
					<TagSelect
						label="Eyebrow Tag"
						value={ eyebrowTag }
						onChange={ ( value ) => {
							setAttributes( { eyebrowTag: value } );
						} }
					/>
					<TagSelect
						label="Headline Tag"
						value={ headlineTag }
						onChange={ ( value ) => {
							setAttributes( { headlineTag: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<JustifyToolbar props={ props } attribute="introAlign" options={ [ 'left', 'center', 'right' ] } />
				</ToolbarGroup>
			</BlockControls>
			<div
				className="wp-block-cwps-cover-block__image"
				style={ { '--cwps-overlayOpacity': imageOpacity, '--cwps-objectPosition': imageCropPosition } }
			>
				{ imageObject?.source_url ? (
					<img src={ imageObject.source_url } alt="" />
				) : backgroundImage.id || featuredImageId ? (
					<Spinner style={ { width: '33%', height: '33%' } } />
				) : (
					<PlaceholderImage hasBgColor={ false } />
				) }
			</div>
			<div className={ `wp-block-cwps-cover-block__body --align-${ introAlign }` }>
				<RichText
					className="wp-block-cwps-cover-block__eyebrow --eyebrow"
					value={ eyebrow }
					allowedFormats={ [] }
					placeholder="Eyebrow..."
					onChange={ ( value ) => {
						setAttributes( { eyebrow: value } );
					} }
				/>
				<RichText
					className="wp-block-cwps-cover-block__headline --hl-xxl"
					value={ headline }
					allowedFormats={ [] }
					placeholder={ postTitle ? postTitle : 'Headline...' }
					onChange={ ( value ) => {
						setAttributes( { headline: value } );
					} }
				/>
				<div
					{ ...useInnerBlocksProps(
						{
							className: 'wp-block-cwps-cover-block__caption',
						},
						{
							allowedBlocks: [ 'core/paragraph' ],
						}
					) }
				/>
				<div className="wp-block-cwps-cover-block__ctas">
					<CtaControl
						className="wp-block-cwps-cover-block__cta --cta --secondary"
						value={ cta }
						onChange={ ( value ) => {
							setAttributes( { cta: value } );
						} }
					/>
					<CtaControl
						className="wp-block-cwps-cover-block__cta --cta --tertiary"
						value={ cta2 }
						onChange={ ( value ) => {
							setAttributes( { cta2: value } );
						} }
					/>
				</div>
			</div>
		</div>
	);
}
