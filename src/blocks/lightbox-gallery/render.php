<?php

if ( $attributes['useFeaturedImage'] && get_the_ID() ) {
	$capitola_featured_image_id = get_post_thumbnail_id( get_the_ID() );

	if ( $capitola_featured_image_id ) {
		array_unshift( $attributes['images'], array( 'id' => $capitola_featured_image_id ) );
	}
}

if ( ! $attributes['images'] ) {
	return;
}

$capitola_image_data = array();

foreach ( $attributes['images'] as $capitola_image ) {
	$capitola_image_data[] = array(
		'smallSrc' => wp_get_attachment_image_url( $capitola_image['id'], 'small' ),
		'medSrc' => wp_get_attachment_image_url( $capitola_image['id'], 'medium_large' ),
		'largeSrc' => wp_get_attachment_image_url( $capitola_image['id'], 'large' ),
		'alt' => trim( get_post_meta( $capitola_image['id'], '_wp_attachment_image_alt', true ) ),
		'caption' => trim( wp_get_attachment_caption( $capitola_image['id'] ) ),
	);
}

wp_localize_script( 'capitola-lightbox-gallery-view-script', 'lightboxGalleryImages', $capitola_image_data );

?>

<figure
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'js-lightboxGallery --aspect-ratio-' . $attributes['aspectRatio'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-lightbox-gallery__inner-wrap<?= $attributes['isSticky'] ? ' --is-sticky' : ''; ?>">
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
			<?php foreach ( $capitola_image_data as $capitola_index => $capitola_image ) : ?>
				<button type="button" class="wp-block-capitola-lightbox-gallery__thumbnail <?= 0 === $capitola_index ? '--is-selected' : ''; ?> js-thumbImageLink" aria-label="Select Image" data-index="<?= esc_attr( $capitola_index ); ?>">
					<img src="<?= esc_url( $capitola_image['smallSrc'] ); ?>" alt="<?= esc_attr( $capitola_image['alt'] ); ?>"/>
				</button>
			<?php endforeach; ?>
		</div>
	</div>
</figure>
