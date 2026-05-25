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
	ImageFocalPoint,
	OverlayOpacitySlider,
	JustifyToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		introAlign,
		backgroundImage,
		imageOpacity,
		imageFocalPoint,
		imageParallax,
		eyebrow,
		headline,
		eyebrowTag,
		headlineTag,
		cta,
		cta2,
		isHeroVariation,
	} = attributes;

	const featuredImageId = useSelect(
		( select ) => {
			if ( ! isHeroVariation ) {
				return 0;
			}
			return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
		},
		[ isHeroVariation ]
	);

	const imageObject = useSelect(
		( select ) => {
			if ( backgroundImage.source_url ) {
				return backgroundImage;
			}
			let imageId;
			if ( backgroundImage.id ) {
				imageId = backgroundImage.id;
			} else if ( isHeroVariation ) {
				imageId = featuredImageId;
			} else {
				imageId = false;
			}
			return imageId
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId )
				: undefined;
		},
		[ backgroundImage, isHeroVariation, featuredImageId ]
	);

	const postTitle = useSelect(
		( select ) => {
			return isHeroVariation
				? select( 'core/editor' ).getEditedPostAttribute( 'title' )
				: false;
		},
		[ isHeroVariation ]
	);

	const blockProps = useBlockProps( {
		className: 'alignfull --theme-image-overlay ' + ( isHeroVariation ? '--hero-height' : '' ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-cover-block__caption',
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Image Settings" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ backgroundImage.id }
						onChange={ ( value ) => {
							setAttributes( {
								backgroundImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					{ !! imageObject?.source_url && (
						<ImageFocalPoint
							image={ imageObject?.source_url }
							value={ imageFocalPoint }
							onChange={ ( value ) => {
								setAttributes( { imageFocalPoint: value } );
							} }
						/>
					) }
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
					<JustifyToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'left', 'center', 'right' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div
				className="wp-block-capitola-cover-block__image"
				style={ {
					'--capitola-overlayOpacity': imageOpacity,
					'--capitola-objectPosition': imageFocalPoint,
				} }
			>
				{ ( () => {
					if ( imageObject?.source_url ) {
						return <img src={ imageObject.source_url } alt="" />;
					} else if ( backgroundImage.id || featuredImageId ) {
						return <Spinner style={ { width: '33%', height: '33%' } } />;
					}
					return <PlaceholderImage hasBgColor={ false } />;
				} )() }
			</div>
			<div className={ `wp-block-capitola-cover-block__body --align-${ introAlign }` }>
				<RichText
					className="wp-block-capitola-cover-block__eyebrow --eyebrow"
					value={ eyebrow }
					allowedFormats={ [] }
					placeholder="Eyebrow..."
					onChange={ ( value ) => {
						setAttributes( { eyebrow: value } );
					} }
				/>
				<RichText
					className="wp-block-capitola-cover-block__headline --hl-xxl"
					value={ headline }
					allowedFormats={ [] }
					placeholder={ postTitle ? postTitle : 'Headline...' }
					onChange={ ( value ) => {
						setAttributes( { headline: value } );
					} }
				/>
				<div { ...innerBlocksProps } />
				<div className="wp-block-capitola-cover-block__ctas">
					<CtaControl
						className="wp-block-capitola-cover-block__cta --cta --secondary"
						value={ cta }
						onChange={ ( value ) => {
							setAttributes( { cta: value } );
						} }
					/>
					<CtaControl
						className="wp-block-capitola-cover-block__cta --cta --tertiary"
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
