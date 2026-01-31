<?php

namespace cwps\loadAssets\styles;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles', 1 );

function enqueue_styles() {

	if ( is_admin() ) {
		wp_enqueue_style( 'cwps-main-styles', CAPITOLA_CSS_URL . 'block-editor.css', array( 'dashicons' ), CAPITOLA_THEME_VER );
	} else {
		wp_enqueue_style( 'cwps-main-styles', CAPITOLA_CSS_URL . 'main.css', array( 'global-styles' ), CAPITOLA_THEME_VER );
	}
}

function register_core_block_styles() {

	$files = glob( CAPITOLA_CSS_DIR . 'wp-core-blocks/*.css' );

	foreach ( $files as $file ) {

		$filename = pathinfo( $file, PATHINFO_FILENAME );

		if ( strpos( $filename, '-rtl' ) === false ) {

			wp_enqueue_block_style(
				'core/' . $filename,
				array(
					'handle' => 'cwps-core-blocks-' . $filename,
					'src'    => CAPITOLA_CSS_URL . '/wp-core-blocks/' . $filename . '.css',
					'path'   => CAPITOLA_CSS_DIR . '/wp-core-blocks/' . $filename . '.css',
					'ver'    => CAPITOLA_THEME_VER,
				)
			);
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\register_core_block_styles' );

// add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\wpforms_scripts', 90 );
// add_action( 'wp_footer', __NAMESPACE__ . '\wpforms_scripts', 90 );

// function wpforms_scripts() {

// wp_dequeue_style( 'wpforms-full' );
// wp_dequeue_style( 'wpforms-base' );
// wp_deregister_style( 'wpforms-full' );
// wp_deregister_style( 'wpforms-base' );

// wp_dequeue_style( 'wpforms-full-css' );
// wp_dequeue_style( 'wpforms-base-css' );
// wp_dequeue_style( 'wpforms-choicesjs' );
// wp_deregister_style( 'wpforms-choicesjs' );

// }
