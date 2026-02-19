<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$caption = $attributes['captionOverride'];
if ( ! $caption ) {
	$caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $attributes['anchor'],
		'class' => 'wp-block-capitola-sticky-images__body-section js-stickyImagesSection',
	)
);
?>

<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<figure class="wp-block-capitola-sticky-images__mobile-imageratio" style="--capitola-objectPosition: <?php echo esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?php echo wp_get_attachment_image( $attributes['sideImage']['id'], 'large' ); ?>
		<?php if ( $attributes['showCaption'] ) : ?>
			<?php if ( $caption ) : ?>
				<figcaption class="wp-block-capitola-sticky-images__image-caption --micro-text">
					<?php echo esc_html( $caption ); ?>
				</figcaption>
			<?php endif; ?>
		<?php endif; ?>
	</figure>
	<?php echo wp_kses_post( $content ); ?>
</div>
