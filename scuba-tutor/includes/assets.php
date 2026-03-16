<?php

namespace Capitola_Child\Load_Assets\Scripts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue frontend and editor styles.
 *
 * @return void
 */
function enqueue_styles() {
	if ( is_admin() ) {
		wp_enqueue_style( 'capitola-child-main-styles', CAPITOLA_CHILD_CSS_URL . 'block-editor.css', array( 'dashicons', 'capitola-main-styles' ), CAPITOLA_CHILD_THEME_VER );
	} else {
		wp_enqueue_style( 'capitola-child-main-styles', CAPITOLA_CHILD_CSS_URL . 'main.css', array( 'global-styles' ), CAPITOLA_CHILD_THEME_VER );
	}
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles', 100 );

/**
 * Enqueue block editor scripts.
 *
 * @return void
 */
function block_scripts() {

	wp_enqueue_script( 'capitola-child-block-editor-hooks', CAPITOLA_CHILD_JS_URL . 'block-editor-hooks.js', array( 'wp-editor', 'wp-plugins' ), CAPITOLA_CHILD_THEME_VER, true );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_scripts', 100 );

/**
 * Adds TinyMCE editor stylesheet.
 *
 * @return void
 */
function add_tinymce_stylesheet() {
	add_editor_style( 'build/styles/tinymce.css' );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\add_tinymce_stylesheet' );
