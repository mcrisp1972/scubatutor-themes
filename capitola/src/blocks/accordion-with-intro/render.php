<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding js-accordion --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-accordion-with-intro__width alignwide <?php echo esc_attr( $animations['block-class'] ); ?>" style="<?php echo wp_kses_data( $animations['block-styles'] ); ?>">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
