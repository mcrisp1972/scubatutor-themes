import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl, TextareaControl, SelectControl, Spinner } from '@wordpress/components';
import { PostPicker, ImageSelect, PlaceholderImage, OverlayOpacitySlider } from '../../editor-controls';
import { postTypeOptions } from '../../scripts/modules/post-types';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		postId,
		postType,
		imageOverride,
		eyebrowOverride,
		titleOverride,
		excerptOverride,
		ctaOverride,
		imageOpacity,
	} = attributes;

	const linkObj = useSelect(
		( select ) => {
			return postId ? select( 'core' ).getEntityRecord( 'postType', postType, postId ) : undefined;
		},
		[ postType, postId ]
	);

	const imageUrl = !! imageOverride.source_url ? imageOverride.source_url : linkObj?.thumbnail_urls.large;

	const linkTag = useSelect(
		( select ) => {
			return linkObj !== undefined && linkObj.type === 'page' && linkObj.parent
				? select( 'core' ).getEntityRecord( 'postType', linkObj.type, linkObj.parent )?.title.raw
				: linkObj !== undefined && linkObj.type !== 'page' && linkObj.type !== 'post' && linkObj.type
				? select( 'core' ).getPostType( linkObj.type )?.name
				: undefined;
		},
		[ linkObj ]
	);

	return (
		<div
			{ ...useBlockProps( {
				className: '--theme-image-overlay',
				style: { '--cwps-overlayOpacity': imageOpacity },
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Link Details" initialOpen={ true }>
					<SelectControl
						label="Link Post Type"
						value={ postType }
						options={ postTypeOptions }
						onChange={ ( value ) => {
							setAttributes( {
								postType: value,
								postId: 0,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<PostPicker
						label="Link"
						value={ postId }
						onChange={ ( value ) => {
							setAttributes( {
								postId: value,
							} );
						} }
						postType={ postType }
					/>
					<ImageSelect
						label="Image"
						value={ imageOverride.id }
						onChange={ ( value ) => {
							setAttributes( { imageOverride: { id: value.id, source_url: value.url } } );
						} }
					/>
					<TextControl
						label="Eyebrow Override"
						value={ eyebrowOverride }
						onChange={ ( value ) => {
							setAttributes( {
								eyebrowOverride: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Title Override"
						value={ titleOverride }
						onChange={ ( value ) => {
							setAttributes( {
								titleOverride: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextareaControl
						label="Excerpt Override"
						value={ excerptOverride }
						onChange={ ( value ) => {
							setAttributes( {
								excerptOverride: value,
							} );
						} }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="CTA Override"
						value={ ctaOverride }
						onChange={ ( value ) => {
							setAttributes( {
								ctaOverride: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<OverlayOpacitySlider
						value={ imageOpacity }
						onChange={ ( value ) => {
							setAttributes( { imageOpacity: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ imageUrl ? (
				<img src={ imageUrl } alt="" />
			) : ! linkObj && postId ? (
				<Spinner style={ { width: '33%', height: '33%', margin: 0 } } />
			) : (
				<PlaceholderImage hasBgColor={ false } />
			) }
			<div className="wp-block-cwps-image-link-grid-item__opacity-layer"></div>
			<div className="wp-block-cwps-image-link-grid-item__text-content">
				<div className="wp-block-cwps-image-link-grid-item__title-wrap">
					<div className="wp-block-cwps-image-link-grid-item__subtitle --eyebrow">
						{ eyebrowOverride ? eyebrowOverride : linkTag }
					</div>
					<div className="wp-block-cwps-image-link-grid-item__title --hl-s">
						{ titleOverride ? titleOverride : linkObj?.title.raw }
					</div>
				</div>
				<div className="wp-block-cwps-image-link-grid-item__excerpt-wrap">
					<div className="wp-block-cwps-image-link-grid-item__excerpt">
						{ excerptOverride ? excerptOverride : linkObj?.excerpt.raw }
					</div>
					{ ( ctaOverride || linkObj?.cta_label ) && (
						<div className="wp-block-cwps-image-link-grid-item__cta --cta --tertiary">
							{ ctaOverride ? ctaOverride : linkObj?.cta_label }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
