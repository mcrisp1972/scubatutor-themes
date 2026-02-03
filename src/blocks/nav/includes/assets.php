<?php

namespace Capitola\Blocks\Nav;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-nav', CAPITOLA_BLOCKS_URL . 'nav/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-nav-editor', CAPITOLA_BLOCKS_URL . 'nav/index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 10 );
