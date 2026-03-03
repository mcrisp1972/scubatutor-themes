<?php

namespace Capitola_Child\Blocks\Footer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block assets.
 *
 * @return void
 */
function register_assets() {
	wp_deregister_style( 'capitola-footer' );
	wp_deregister_style( 'capitola-footer-editor' );
	wp_register_style( 'capitola-footer', CAPITOLA_CHILD_BLOCKS_URL . 'footer/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_CHILD_THEME_VER );
	wp_register_style( 'capitola-footer-editor', CAPITOLA_CHILD_BLOCKS_URL . 'footer/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-footer' ), CAPITOLA_CHILD_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 100 );
