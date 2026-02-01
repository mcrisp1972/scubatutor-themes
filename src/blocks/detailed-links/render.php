<?php

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		'style' => '--capitola-excerpt-lines: ' . $attributes['excerptLines'] . ';',
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-capitola-detailed-links__width alignwide <?= esc_attr( $animations['block-class'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
