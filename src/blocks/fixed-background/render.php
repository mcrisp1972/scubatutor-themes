<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$theme_class = $attributes['colorThemeBody'] ? ' --theme-' . $attributes['colorTheme'] : ' --theme-image-overlay';
$align_class = $attributes['introAlign'] ? ' --align-' . $attributes['introAlign'] : '';
$animations  = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull ' . $theme_class,
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-fixed-background__img js-background-image <?php echo esc_attr( $align_class ); ?>">
		<picture>
			<?php if ( $attributes['desktopImage']['id'] ) : ?>
				<source media="(min-width: 1024px)" srcset="<?php echo esc_url( wp_get_attachment_image_url( $attributes['desktopImage']['id'], 'full' ) ); ?>">
			<?php endif; ?>
			<?php if ( $attributes['tabletImage']['id'] ) : ?>
				<source media="(min-width: 768px)" srcset="<?php echo esc_url( wp_get_attachment_image_url( $attributes['tabletImage']['id'], 'large' ) ); ?>">
			<?php endif; ?>
			<?php if ( $attributes['mobileImage']['id'] ) : ?>
				<img src="<?php echo esc_url( ( $attributes['mobileImage']['id'] ? wp_get_attachment_image_url( $attributes['mobileImage']['id'], 'medium_large' ) : '' ) ); ?>">
			<?php endif; ?>
		</picture>
		<div class="wp-block-capitola-fixed-background__opacity" style="opacity: <?php echo esc_attr( $attributes['imageOpacity'] ); ?>"></div>
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
