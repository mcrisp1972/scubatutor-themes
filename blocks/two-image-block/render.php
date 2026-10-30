<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $attributes );

if ( $attributes['rearImageShowCaption'] ) {
	if ( $attributes['rearImageCaption'] ) {
		$rear_image_caption = $attributes['rearImageCaption'];
	} elseif ( $attributes['rearImage']['id'] ) {
		$rear_image_caption = wp_get_attachment_caption( $attributes['rearImage']['id'] );
	}
} else {
	$rear_image_caption = false;
}

if ( $attributes['frontImageShowCaption'] ) {
	if ( $attributes['frontImageCaption'] ) {
		$front_image_caption = $attributes['frontImageCaption'];
	} elseif ( $attributes['frontImage']['id'] ) {
		$front_image_caption = wp_get_attachment_caption( $attributes['frontImage']['id'] );
	}
} else {
	$front_image_caption = false;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-two-image-block__width alignwide --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro <?php echo esc_attr( $animations['block-class'] ); ?><?php echo ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" style="<?php echo $animations['block-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<div class="wp-block-capitola-two-image-block__imagecol <?php echo esc_attr( $animations['figure-class'] ); ?> --rear-position-<?php echo esc_attr( $attributes['rearImagePosition'] ); ?>" style="aspect-ratio: var(--wp--preset--aspect-ratio--<?php echo esc_attr( $attributes['gridAspectRatio'] ); ?>); --wp--custom--figure-col-width: <?php echo esc_attr( $attributes['mediaWidth'] ); ?>%; <?php echo $animations['figure-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
			<figure class="wp-block-capitola-two-image-block__rear-image" style="border-radius: var(--wp--preset--border-radius--<?php echo esc_attr( $attributes['rearImageRadius'] ); ?>); --wp--custom--image-height: <?php echo esc_attr( $attributes['rearImageHeight'] ); ?>; --wp--custom--image-width:<?php echo esc_attr( $attributes['rearImageWidth'] ); ?>; --wp--custom--object-position:<?php echo esc_attr( $attributes['rearImageFocalPoint'] ); ?>;">
				<?php echo wp_get_attachment_image( $attributes['rearImage']['id'], 'large' ); ?>
				<?php if ( $rear_image_caption ) : ?>
					<figcaption>
						<?php echo esc_html( $rear_image_caption ); ?>
					</figcaption>
				<?php endif; ?>
			</figure>
			<figure class="wp-block-capitola-two-image-block__front-image" style="border-radius: var(--wp--preset--border-radius--<?php echo esc_attr( $attributes['frontImageRadius'] ); ?>);  --wp--custom--image-height: <?php echo esc_attr( $attributes['frontImageHeight'] ); ?>; --wp--custom--image-width: <?php echo esc_attr( $attributes['frontImageWidth'] ); ?>; --wp--custom--object-position:<?php echo esc_attr( $attributes['frontImageFocalPoint'] ); ?>">
				<?php echo wp_get_attachment_image( $attributes['frontImage']['id'], 'large' ); ?>
				<?php if ( $front_image_caption ) : ?>
					<figcaption>
						<?php echo esc_html( $front_image_caption ); ?>
					</figcaption>
				<?php endif; ?>
			</figure>
		</div>
	</div>
</section>
