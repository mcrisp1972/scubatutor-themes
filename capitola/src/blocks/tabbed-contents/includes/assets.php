<?php

namespace Capitola\Blocks\Tabbed_Contents;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-tabbed-contents', CAPITOLA_BLOCKS_URL . 'tabbed-contents/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
