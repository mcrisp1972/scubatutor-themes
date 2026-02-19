<?php

namespace Capitola\Blocks\Nav_Dropdown;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-nav-dropdown', CAPITOLA_BLOCKS_URL . 'nav-dropdown/style-index.css', array( CAPITOLA_STYLE_DEP, 'capitola-nav' ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
