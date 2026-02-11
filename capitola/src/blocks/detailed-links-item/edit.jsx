import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { PostPicker, ImageSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;
	const { postType, postId, linkImage, linkTitle, linkExcerpt } = attributes;
	const postTypeOptions = applyFilters( 'capitola.postTypeOptions' );

	const linkObj = useSelect(
		( select ) => {
			return postId
				? select( 'core' ).getEntityRecord( 'postType', postType, postId )
				: undefined;
		},
		[ postType, postId ]
	);

	const imageObject = useSelect(
		( select ) => {
			if ( linkImage.source_url ) {
				return linkImage;
			}
			return context.showImage && linkImage
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', linkImage )
				: undefined;
		},
		[ linkImage, context.showImage ]
	);

	const imageUrl = imageObject ? imageObject.source_url : linkObj?.thumbnail_urls?.thumbnail;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Link Details" initialOpen={ true }>
					<SelectControl
						label="Link 1 Post Type"
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
						label="Link 1"
						value={ postId }
						onChange={ ( value ) => {
							setAttributes( {
								postId: value,
							} );
						} }
						postType={ postType }
					/>
					{ context.showImage && (
						<ImageSelect
							label="Image Override"
							value={ linkImage.id }
							onChange={ ( value ) => {
								setAttributes( {
									linkImage: { id: value.id, source_url: value.url },
								} );
							} }
						/>
					) }
					<TextControl
						label="Title Override"
						value={ linkTitle }
						onChange={ ( value ) => {
							setAttributes( {
								linkTitle: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					{ context.showExcerpt && (
						<TextareaControl
							label="Excerpt Override"
							value={ linkExcerpt }
							onChange={ ( value ) => {
								setAttributes( {
									linkExcerpt: value,
								} );
							} }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ context.showImage && (
				<div className="wp-block-capitola-detailed-links-item__image">
					{ imageUrl && <img src={ imageUrl } alt="" /> }
				</div>
			) }
			<div className="wp-block-capitola-detailed-links-item__body">
				<div className="wp-block-capitola-detailed-links-item__title --hl-s">
					{ !! linkTitle ? linkTitle : linkObj?.title.raw }
				</div>
				{ !! context.showExcerpt && (
					<p className="wp-block-capitola-detailed-links-item__excerpt">
						{ !! linkExcerpt ? linkExcerpt : linkObj?.excerpt.raw }
					</p>
				) }
			</div>
		</div>
	);
}
