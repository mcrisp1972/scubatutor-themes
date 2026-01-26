<?php

namespace cwps\loadAssets\scripts;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\theme_scripts', 99 );

function theme_scripts() {

	wp_register_script( 'cwps-accordion', CWPS_THEME_JS_URL . 'accordion.js', array(), CWPS_THEME_VER, true );

	wp_register_script( 'cwps-listing-sidescroll', CWPS_THEME_JS_URL . 'listingSidescroll.js', array(), CWPS_THEME_VER, true );

	wp_register_script( 'cwps-animations', CWPS_THEME_JS_URL . 'animations.js', array(), CWPS_THEME_VER, true );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_scripts', 99 );

function block_scripts() {
	// wp_enqueue_script( 'cwps-block-filters', CWPS_THEME_JS_URL . 'block-filters.js', array( 'wp-hooks' ), CWPS_THEME_VER );

	wp_enqueue_script( 'cwps-block-editor-hooks', CWPS_THEME_JS_URL . 'block-editor-hooks.js', array( 'wp-editor', 'wp-plugins' ), CWPS_THEME_VER, true );
}

// add_action( 'wp_print_scripts', __NAMESPACE__ . '\print_enqueued_scripts' );

function print_enqueued_scripts() {
	global $wp_scripts;
	$enqueued_scripts = array();
	foreach ( $wp_scripts->queue as $handle ) {
		if ( ! array_key_exists( $handle, $enqueued_scripts ) ) {
			foreach ( $wp_scripts->registered[ $handle ]->deps as $dep ) {
				if ( ! array_key_exists( $dep, $enqueued_scripts ) ) {
					$enqueued_scripts[ $dep ] = $wp_scripts->registered[ $dep ]->src;
				}
			}
			$enqueued_scripts[ $handle ] = $wp_scripts->registered[ $handle ]->src;
		}
	}
	error_log( print_r( $enqueued_scripts, 1 ) );
}

// add_action( 'wp_print_styles', __NAMESPACE__ . '\print_enqueued_styles' );
function print_enqueued_styles() {
	global $wp_styles;
	$enqueued_scripts = array();
	// error_log( print_r( $wp_scripts, 1 ) );
	foreach ( $wp_styles->queue as $handle ) {
		if ( ! array_key_exists( $handle, $enqueued_scripts ) ) {
			foreach ( $wp_styles->registered[ $handle ]->deps as $dep ) {
				if ( ! array_key_exists( $dep, $enqueued_scripts ) ) {
					$enqueued_scripts[ $dep ] = $wp_styles->registered[ $dep ]->src;
				}
			}
			$enqueued_scripts[ $handle ] = $wp_styles->registered[ $handle ]->src;
		}
	}
	error_log( print_r( $enqueued_scripts, 1 ) );
}
