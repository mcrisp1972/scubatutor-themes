<?php

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
		'medSrc' => wp_get_attachment_image_url( $image['id'], 'medium_large' ),
		'largeSrc' => wp_get_attachment_image_url( $image['id'], 'large' ),
		'alt' => trim( get_post_meta( $image['id'], '_wp_attachment_image_alt', true ) ),
		'caption' => trim( wp_get_attachment_caption( $image['id'] ) ),
	);
}

wp_localize_script( 'capitola-lightbox-gallery-view-script', 'lightboxGalleryImages', $image_data );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'js-lightboxGallery --aspect-ratio-' . $attributes['aspectRatio'],
	)
);

?>

<figure <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-capitola-lightbox-gallery__inner-wrap<?= $attributes['isSticky'] ? ' --is-sticky' : '' ?>">
		<button type="button" class="wp-block-capitola-lightbox-gallery__main-image js-largeImageLink">
			<?=
			wp_get_attachment_image(
				$attributes['images'][0]['id'],
				'medium_large',
				false,
				array(
					'srcset' => false,
					'sizes' => false,
				)
			)
			?>
			<div class="wp-block-capitola-lightbox-gallery__main-image-hover"></div>
		</button>
		<div class="wp-block-capitola-lightbox-gallery__thumbnails js-lightboxThumbs">
			<?php foreach ( $image_data as $index => $image ) : ?>
				<button type="button" class="wp-block-capitola-lightbox-gallery__thumbnail <?= $index === 0 ? '--is-selected' : '' ?> js-thumbImageLink" aria-label="Select Image" data-index="<?= esc_attr( $index ) ?>">
					<img src="<?= esc_url( $image['smallSrc'] ) ?>" alt="<?= esc_attr( $image['alt'] ) ?>"/>
				</button>
			<?php endforeach; ?>
		</div>
	</div>
</figure>
