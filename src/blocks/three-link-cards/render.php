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
	<div class="wp-block-cwps-three-link-cards__width alignwide --layout-<?= esc_attr( $attributes['introAlign'] ) ?> <?= esc_attr( $animations['block-class'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
