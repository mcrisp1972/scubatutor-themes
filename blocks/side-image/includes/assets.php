<?php

namespace Capitola\Blocks\Side_Image;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-side-image', CAPITOLA_BLOCKS_URL . 'side-image/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-side-image-editor', CAPITOLA_BLOCKS_URL . 'side-image/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-side-image' ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
