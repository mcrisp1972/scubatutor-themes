<?php

namespace Capitola\Blocks\Accordion;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-accordion', CAPITOLA_BLOCKS_URL . 'accordion/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );

	wp_register_style( 'capitola-accordion-editor', CAPITOLA_BLOCKS_URL . 'accordion/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-accordion' ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
