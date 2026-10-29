<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$caption = $attributes['captionOverride'];
if ( ! $caption ) {
	$caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
}

$radius_style = 'inner' === $block->context['capitola/imageLayout'] ? 'border-radius: var(--wp--preset--border-radius--' . $block->context['capitola/imageRadius'] . ');' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-sticky-images__body-section js-stickyImagesSection',
	)
);
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<figure
		class="wp-block-capitola-sticky-images__mobile-imageratio"
		style="<?php echo esc_attr( $radius_style ); ?>--wp--custom--object-position: <?php echo esc_attr( $attributes['imageFocalPoint'] ); ?>;">
		<?php echo wp_get_attachment_image( $attributes['sideImage']['id'], 'large' ); ?>
		<?php if ( $attributes['showCaption'] ) : ?>
			<?php if ( $caption ) : ?>
		<figcaption class="wp-block-capitola-sticky-images__image-caption --text-s">
				<?php echo esc_html( $caption ); ?>
		</figcaption>
		<?php endif; ?>
		<?php endif; ?>
		</figure>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
