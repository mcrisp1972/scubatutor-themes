<?php

namespace Capitola\Blocks\Page_Nav;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-page-nav', CAPITOLA_CHILD_BLOCKS_URL . 'page-nav/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_CHILD_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
