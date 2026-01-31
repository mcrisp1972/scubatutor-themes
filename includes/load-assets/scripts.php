<?php

namespace cwps\loadAssets\scripts;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\theme_scripts', 99 );

function theme_scripts() {

	wp_register_script( 'cwps-listing-sidescroll', CAPITOLA_JS_URL . 'listingSidescroll.js', array(), CAPITOLA_THEME_VER, true );

	wp_register_script( 'cwps-animations', CAPITOLA_JS_URL . 'animations.js', array(), CAPITOLA_THEME_VER, true );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_scripts', 99 );

function block_scripts() {
	// wp_enqueue_script( 'cwps-block-filters', CAPITOLA_JS_URL . 'block-filters.js', array( 'wp-hooks' ), CAPITOLA_THEME_VER );

	wp_enqueue_script( 'cwps-block-editor-hooks', CAPITOLA_JS_URL . 'block-editor-hooks.js', array( 'wp-editor', 'wp-plugins' ), CAPITOLA_THEME_VER, true );
}
