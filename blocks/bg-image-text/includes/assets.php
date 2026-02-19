<?php

namespace Capitola\Blocks\Background_Image;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-background-image', CAPITOLA_BLOCKS_URL . 'bg-image-text/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
