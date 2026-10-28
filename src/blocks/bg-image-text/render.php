<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\img_scroll_animation_class;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-bg-image-text__imagewrap <?php echo esc_attr( img_scroll_animation_class( ( $attributes['imageScrollAnimation'] ) ) ); ?>" style="--capitola-objectPosition: <?php echo esc_attr( $attributes['imageFocalPoint'] ); ?>;">
		<?php echo wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
	</div>
	<div class="wp-block-capitola-bg-image-text__width --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</section>
