<?php

$theme_class = $attributes['colorThemeBody'] ? ' --theme-' . $attributes['colorTheme'] : ' --theme-image-overlay';
$align_class = $attributes['introAlign'] ? ' --align-' . $attributes['introAlign'] : '';
$animations = \cwps\helpers\blockAttributes\animation_attributes( $attributes );
$radius_class = $attributes['introRadius'] !== 'none' && $attributes['colorThemeBody'] ? ' --has-' . $attributes['introRadius'] . '-radius' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull ' . $theme_class . $radius_class,
	)
);
?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-fixed-background__img js-background-image <?= esc_attr( $align_class ) ?>">
		<picture>
			<?php if ( $attributes['desktopImage']['id'] ) : ?>
				<source media="(min-width: 1024px)" srcset="<?= esc_url( wp_get_attachment_image_url( $attributes['desktopImage']['id'], 'full' ) ) ?>">
			<?php endif; ?>
			<?php if ( $attributes['tabletImage']['id'] ) : ?>
				<source media="(min-width: 768px)" srcset="<?= esc_url( wp_get_attachment_image_url( $attributes['tabletImage']['id'], 'large' ) ) ?>">
			<?php endif; ?>
			<?php if ( $attributes['mobileImage']['id'] ) : ?>
				<img src="<?= esc_url( ( $attributes['mobileImage']['id'] ? wp_get_attachment_image_url( $attributes['mobileImage']['id'], 'medium_large' ) : '' ) ) ?>">
			<?php endif; ?>
		</picture>
		<div class="wp-block-cwps-fixed-background__opacity" style="opacity: <?= esc_attr( $attributes['imageOpacity'] ) ?>"></div>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
