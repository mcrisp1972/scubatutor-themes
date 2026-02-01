<?php

$parallax_class = \Capitola\Helpers\Block_Attributes\parallax_img_class( ( $attributes['imageParallax'] ) );
$radius_class = $attributes['introRadius'] !== 'none' ? ' --has-' . $attributes['introRadius'] . '-radius' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull --theme-' . $attributes['colorTheme'],
		'id' => $attributes['anchor'],
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-bg-image-text__imagewrap <?= esc_attr( $parallax_class ) ?>" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ) ?>;">
		<?= wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ) ?>
	</div>
	<div class="wp-block-cwps-bg-image-text__width --has-<?= esc_attr( $attributes['introAlign'] ) ?>-intro <?= esc_attr( $radius_class ) ?>">
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
