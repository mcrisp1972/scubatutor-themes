<?php

namespace cwps\loadAssets\scripts;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\theme_scripts', 99 );

function theme_scripts() {

	wp_register_script( 'cwps-listing-sidescroll', CWPS_THEME_JS_URL . 'listingSidescroll.js', array(), CWPS_THEME_VER, true );

	wp_register_script( 'cwps-animations', CWPS_THEME_JS_URL . 'animations.js', array(), CWPS_THEME_VER, true );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_scripts', 99 );

function block_scripts() {
	// wp_enqueue_script( 'cwps-block-filters', CWPS_THEME_JS_URL . 'block-filters.js', array( 'wp-hooks' ), CWPS_THEME_VER );

	wp_enqueue_script( 'cwps-block-editor-hooks', CWPS_THEME_JS_URL . 'block-editor-hooks.js', array( 'wp-editor', 'wp-plugins' ), CWPS_THEME_VER, true );
}
