<?php

namespace Capitola\Blocks\Footer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block styles for the footer block.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-footer', CAPITOLA_BLOCKS_URL . 'footer/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-footer-editor', CAPITOLA_BLOCKS_URL . 'footer/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-footer' ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
