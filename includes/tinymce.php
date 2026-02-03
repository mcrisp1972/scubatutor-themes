<?php

namespace Capitola\Tiny_Mce;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds the theme color palette to TinyMCE.
 *
 * @param array $init TinyMCE init settings.
 * @return array
 */
function color_palette( $init ) {

	$color_palette = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );

	$custom_colors = array();

	if ( ! empty( $color_palette ) ) {
		foreach ( $color_palette as $color ) {
			$custom_colors[] = '"' . str_replace( '#', '', $color['color'] ) . '", "' . $color['name'] . '"';
		}
	}

	$init['textcolor_map']  = '[' . implode( ',', $custom_colors ) . ']';
	$init['textcolor_rows'] = 6; // Adjust rows if adding many colors.
	return $init;
}

add_filter( 'tiny_mce_before_init', __NAMESPACE__ . '\color_palette' );

/**
 * Adds TinyMCE editor stylesheet.
 *
 * @return void
 */
function add_tinymce_stylesheet() {
	add_editor_style( 'build/styles/tinymce.css' );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\add_tinymce_stylesheet' );
