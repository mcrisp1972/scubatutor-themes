<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

// Ensure the Interactivity API is loaded.
wp_enqueue_script_module( '@wordpress/interactivity' );

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'               => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		'data-wp-interactive' => 'capitola-tabbed-contents',
		'data-wp-context'     => wp_json_encode( array( 'activePanel' => $block->inner_blocks[1]->inner_blocks[0]->attributes['pillLabel'] ) ),
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-tabbed-contents__width alignwide <?php echo esc_attr( $animations['block-class'] ); ?> --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro" style="<?php echo wp_kses_data( $animations['block-styles'] ); ?>">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
