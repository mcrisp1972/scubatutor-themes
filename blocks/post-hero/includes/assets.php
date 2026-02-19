<?php

namespace Capitola\Blocks\Post_Hero;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-post-hero', CAPITOLA_BLOCKS_URL . 'post-hero/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
