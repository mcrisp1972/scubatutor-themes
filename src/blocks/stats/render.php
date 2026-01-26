<?php

$animations = \cwps\helpers\blockAttributes\animation_attributes( $attributes );
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-stats__width alignwide --has-<?= esc_attr( $attributes['introAlign'] ) ?>-intro <?= esc_attr( $animations['block-class'] ) ?> --item-align-<?= esc_attr( $attributes['textAlignment'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
