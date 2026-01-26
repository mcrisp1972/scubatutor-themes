<?php

// Ensure the Interactivity API is loaded
wp_enqueue_script_module( '@wordpress/interactivity' );

$animations = \cwps\helpers\blockAttributes\animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		'data-wp-interactive' => 'cwps-tabbed-contents',
		'data-wp-context' => wp_json_encode( array( 'activePanel' => $block->inner_blocks[1]->inner_blocks[0]->attributes['pillLabel'] ) ),
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-tabbed-contents__width alignwide<?= esc_attr( $animations['block-class'] ) ?> --has-<?= esc_attr( $attributes['introAlign'] ) ?>-intro" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
