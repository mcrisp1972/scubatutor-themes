<?php

namespace Capitola\Tiny_Mce;

function color_palette( $init ) {

	$color_palette = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );

	$custom_colors = array();

	if ( ! empty( $color_palette ) ) {
		foreach ( $color_palette as $color ) {
			$custom_colors[] = '"' . str_replace( '#', '', $color['color'] ) . '", "' . $color['name'] . '"';
		}
	}

	$init['textcolor_map'] = '[' . implode( ',', $custom_colors ) . ']';
	$init['textcolor_rows'] = 6; // Adjust rows if adding many colors.
	return $init;
}

add_filter( 'tiny_mce_before_init', __NAMESPACE__ . '\color_palette' );

add_action(
	'after_setup_theme',
	function () {
		add_editor_style( 'build/styles/tinymce.css' );
	}
);
