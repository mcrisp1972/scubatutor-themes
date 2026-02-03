<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$capitola_caption = $attributes['captionOverride'];
if ( ! $capitola_caption ) {
	$capitola_caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
}
?>

<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'wp-block-capitola-sticky-images__body-section js-stickyImagesSection',
		)
	)
);
?>
>
	<figure class="wp-block-capitola-sticky-images__mobile-imageratio" style="--capitola-objectPosition: <?php echo esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?php echo wp_get_attachment_image( $attributes['sideImage']['id'], 'large' ); ?>
		<?php if ( $attributes['showCaption'] ) : ?>
			<?php if ( $capitola_caption ) : ?>
				<figcaption class="wp-block-capitola-sticky-images__image-caption --micro-text">
					<?php echo esc_html( $capitola_caption ); ?>
				</figcaption>
			<?php endif; ?>
		<?php endif; ?>
	</figure>
	<?php echo wp_kses_post( $content ); ?>
</div>
