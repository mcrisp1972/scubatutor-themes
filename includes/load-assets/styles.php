<?php

namespace Capitola\Load_Assets\Styles;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueues front-end and editor styles.
 *
 * @return void
 */
function enqueue_styles() {

	if ( is_admin() ) {
		wp_enqueue_style( 'capitola-main-styles', CAPITOLA_CSS_URL . 'block-editor.css', array( 'dashicons' ), CAPITOLA_THEME_VER );
	} else {
		wp_enqueue_style( 'capitola-main-styles', CAPITOLA_CSS_URL . 'main.css', array( 'global-styles' ), CAPITOLA_THEME_VER );
	}
}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles', 1 );

/**
 * Registers custom styles for core blocks.
 *
 * @return void
 */
function register_core_block_styles() {

	$files = glob( CAPITOLA_CSS_DIR . 'wp-core-blocks/*.css' );

	foreach ( $files as $file ) {

		$filename = pathinfo( $file, PATHINFO_FILENAME );

		if ( strpos( $filename, '-rtl' ) === false ) {

			wp_enqueue_block_style(
				'core/' . $filename,
				array(
					'handle' => 'capitola-core-blocks-' . $filename,
					'src'    => CAPITOLA_CSS_URL . '/wp-core-blocks/' . $filename . '.css',
					'path'   => CAPITOLA_CSS_DIR . '/wp-core-blocks/' . $filename . '.css',
					'ver'    => CAPITOLA_THEME_VER,
				)
			);
		}
	}
}

add_action( 'init', __NAMESPACE__ . '\register_core_block_styles' );
