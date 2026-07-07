import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { PlaceholderImage, ImageSelectButton } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { images, aspectRatio, useFeaturedImage, isSticky, allowSticky } = attributes;

	const featuredImageId = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	}, [] );

	const featuredImageObj = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecord( 'postType', 'attachment', featuredImageId );
		},
		[ featuredImageId ]
	);

	const combinedImages = useFeaturedImage ? [ featuredImageObj, ...images ] : images;
	const blockProps = useBlockProps( {
		className: '--aspect-ratio-' + aspectRatio,
	} );

	return (
		<figure { ...blockProps }>
			<InspectorControls group="styles">
				<PanelBody title="Options" initialOpen={ true }>
					<ToggleControl
						label="Use Featured Image"
						checked={ useFeaturedImage }
						onChange={ ( value ) => {
							setAttributes( { useFeaturedImage: value } );
						} }
					/>
					<SelectControl
						label="Aspect Ratio"
						value={ aspectRatio }
						options={ [
							{ label: '16:9', value: '16-9' },
							{ label: '3:2', value: '3-2' },
							{ label: '4:3', value: '4-3' },
							{ label: '1:1', value: '1' },
						] }
						onChange={ ( value ) => {
							setAttributes( { aspectRatio: value } );
						} }
						__next40pxDefaultSize
					/>
					{ allowSticky && (
						<ToggleControl
							label="Sticky"
							checked={ isSticky }
							onChange={ ( value ) => {
								setAttributes( { isSticky: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div
				className={
					'wp-block-capitola-lightbox-gallery__inner-wrap' +
					( isSticky ? ' --is-sticky' : '' )
				}
			>
				<div className="wp-block-capitola-lightbox-gallery__main-image">
					{ combinedImages[ 0 ]?.source_url ? (
						<img src={ combinedImages[ 0 ].source_url } alt="" />
					) : (
						! combinedImages[ 0 ]?.source_url &&
						( ! useFeaturedImage || ! featuredImageId ) && <PlaceholderImage />
					) }
					{ ! combinedImages[ 0 ]?.source_url &&
						useFeaturedImage &&
						!! featuredImageId && (
							<Spinner style={ { width: '33%', height: '33%' } } />
						) }
				</div>
				<div className="wp-block-capitola-lightbox-gallery__thumbnails">
					{ !! combinedImages &&
						combinedImages.length > 1 &&
						combinedImages.map( ( image, index ) => {
							return (
								<div
									key={ index }
									className="wp-block-capitola-lightbox-gallery__thumbnail"
								>
									{ image?.source_url ? (
										<img src={ image.source_url } alt="" />
									) : (
										<PlaceholderImage />
									) }
								</div>
							);
						} ) }
				</div>
				{ isSelected && (
					<ImageSelectButton
						value={ images.map( ( image ) => {
							return image.id;
						} ) }
						onSelect={ ( values ) => {
							setAttributes( {
								images: values.map( ( image ) => {
									return {
										id: image.id,
										source_url: image.url,
									};
								} ),
							} );
						} }
						flexWrap={ true }
					/>
				) }
			</div>
		</figure>
	);
}
