<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$animations = animation_attributes( $attributes );

?>
<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding js-accordion --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-accordion-with-intro__width alignwide <?php echo esc_attr( $animations['block-class'] ); ?>" <?php echo wp_kses_data( $animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
