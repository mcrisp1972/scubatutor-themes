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
		wp_enqueue_style( 'capitola-child-main-styles', CAPITOLA_CHILD_CSS_URL . 'block-editor.css', array( 'dashicons' ), CAPITOLA_CHILD_THEME_VER );
	} else {
		wp_enqueue_style( 'capitola-child-main-styles', CAPITOLA_CHILD_CSS_URL . 'main.css', array( 'global-styles' ), CAPITOLA_CHILD_THEME_VER );
	}
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles', 100 );
