<?php

namespace Capitola\Load_Assets\Scripts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers theme scripts for block assets.
 *
 * @return void
 */
function theme_scripts() {
	wp_register_script( 'capitola-listing-sidescroll', CAPITOLA_JS_URL . 'listing-sidescroll.js', array(), CAPITOLA_THEME_VER, true );
	wp_register_script( 'capitola-animations', CAPITOLA_JS_URL . 'animations.js', array(), CAPITOLA_THEME_VER, true );
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\theme_scripts', 99 );

/**
 * Enqueues editor-only scripts for blocks.
 *
 * @return void
 */
function block_scripts() {
	wp_enqueue_script( 'capitola-block-editor-hooks', CAPITOLA_JS_URL . 'block-editor-hooks.js', array( 'wp-editor', 'wp-plugins' ), CAPITOLA_THEME_VER, true );
}

// Priority must be 1.
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_scripts', 1 );
