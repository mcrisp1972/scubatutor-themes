<?php

namespace Capitola\Helpers\Options;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Gets color theme definitions from the active child theme when available.
 *
 * Falls back to the parent theme color definitions when no child file exists.
 *
 * @return array|null
 */
function get_color_themes() {
	if ( is_child_theme() && file_exists( CAPITOLA_CHILD_THEME_DIR . '/color-themes.json' ) ) {
		return wp_json_file_decode(
			CAPITOLA_CHILD_THEME_DIR . '/color-themes.json',
			array( 'associative' => true )
		);
	}

	return wp_json_file_decode(
		CAPITOLA_THEME_DIR . '/color-themes.json',
		array( 'associative' => true )
	);
}
