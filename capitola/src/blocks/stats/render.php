<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-stats__width alignwide --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro <?php echo esc_attr( $animations['block-class'] ); ?> --item-align-<?php echo esc_attr( $attributes['textAlignment'] ); ?>" <?php echo wp_kses_data( $animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
