<?php

namespace Capitola\Blocks\Svg_List;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-svg-list', CAPITOLA_BLOCKS_URL . 'svg-list/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_CHILD_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
