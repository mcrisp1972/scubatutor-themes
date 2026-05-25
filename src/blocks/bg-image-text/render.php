<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull --theme-' . $attributes['colorTheme'],
	)
);


?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-bg-image-text__imagewrap <?php echo esc_attr( \Capitola\Helpers\Block_Attributes\parallax_img_class( ( $attributes['imageParallax'] ) ) ); ?>" style="--capitola-objectPosition: <?php echo esc_attr( $attributes['imageFocalPoint'] ); ?>;">
		<?php echo wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
	</div>
	<div class="wp-block-capitola-bg-image-text__width --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro <?php echo esc_attr( 'none' !== $attributes['introRadius'] ? ' --has-' . $attributes['introRadius'] . '-radius' : '' ); ?>">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
