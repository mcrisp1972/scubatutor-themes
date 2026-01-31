<?php

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'wp-block-cwps-sticky-images__body-section js-stickyImagesSection',
	)
);

?>

<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<figure class="wp-block-cwps-sticky-images__mobile-imageratio" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ) ?>;">
		<?= wp_get_attachment_image( $attributes['sideImage']['id'], 'large' ) ?>
		<?php if ( $attributes['showCaption'] ) : ?>
			<?php $caption = $attributes['captionOverride'] ?: wp_get_attachment_caption( $attributes['sideImage']['id'] ); ?>
			<?php if ( $caption ) : ?>
				<figcaption class="wp-block-cwps-sticky-images__image-caption --micro-text">
					<?= esc_html( $caption ) ?>
				</figcaption>
			<?php endif; ?>
		<?php endif; ?>
	</figure>
	<?= wp_kses_post( $content ) ?>
</div>
