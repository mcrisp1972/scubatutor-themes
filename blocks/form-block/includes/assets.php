<?php

namespace Capitola\Blocks\Form_Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block assets.
 *
 * @return void
 */
function register_assets() {
	wp_register_style( 'capitola-form-block', CAPITOLA_BLOCKS_URL . 'form-block/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-wp-forms', CAPITOLA_CSS_URL . 'blocks/wp-forms.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-GForm', CAPITOLA_CSS_URL . 'blocks/gravity-forms.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
