<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $attributes['useFeaturedImage'] && get_the_ID() ) {
	$featured_image_id = get_post_thumbnail_id( get_the_ID() );

	if ( $featured_image_id ) {
		array_unshift( $attributes['images'], array( 'id' => $featured_image_id ) );
	}
}

if ( ! $attributes['images'] ) {
	return;
}

$image_data = array();

foreach ( $attributes['images'] as $image ) {
	$image_data[] = array(
		'smallSrc' => wp_get_attachment_image_url( $image['id'], 'small' ),
		'medSrc'   => wp_get_attachment_image_url( $image['id'], 'medium_large' ),
		'largeSrc' => wp_get_attachment_image_url( $image['id'], 'large' ),
		'alt'      => trim( get_post_meta( $image['id'], '_wp_attachment_image_alt', true ) ),
		'caption'  => trim( wp_get_attachment_caption( $image['id'] ) ),
	);
}

wp_localize_script( 'capitola-lightbox-gallery-view-script', 'lightboxGalleryImages', $image_data );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'js-lightboxGallery --aspect-ratio-' . $attributes['aspectRatio'],
	)
);

?>

<figure <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-lightbox-gallery__inner-wrap<?php echo $attributes['isSticky'] ? ' --is-sticky' : ''; ?>">
		<button type="button" class="wp-block-capitola-lightbox-gallery__main-image js-largeImageLink">
			<?php
			echo wp_get_attachment_image(
				$attributes['images'][0]['id'],
				'medium_large',
				false,
				array(
					'srcset' => false,
					'sizes'  => false,
				)
			)
			?>
			<div class="wp-block-capitola-lightbox-gallery__main-image-hover"></div>
		</button>
		<div class="wp-block-capitola-lightbox-gallery__thumbnails js-lightboxThumbs">
			<?php foreach ( $image_data as $index => $image ) : ?>
				<button type="button" class="wp-block-capitola-lightbox-gallery__thumbnail <?php echo 0 === $index ? '--is-selected' : ''; ?> js-thumbImageLink" aria-label="Select Image" data-index="<?php echo esc_attr( $index ); ?>">
					<img src="<?php echo esc_url( $image['smallSrc'] ); ?>" alt="<?php echo esc_attr( $image['alt'] ); ?>"/>
				</button>
			<?php endforeach; ?>
		</div>
	</div>
</figure>
