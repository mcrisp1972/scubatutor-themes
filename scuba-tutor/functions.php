<?php
/**
 * SantaCruzDivers functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package SantaCruzDivers
 */

/**
 * Include all PHP files from a specified folder.
 *
 * @param string $folder The folder path to include files from.
 */
function capitola_child_include_files_in_folder( $folder ) {
	if ( ! empty( $folder ) ) {
		foreach ( glob( __DIR__ . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . '*' ) as $path ) {
			if ( is_dir( $path ) ) {
				$subdir = str_replace( __DIR__ . DIRECTORY_SEPARATOR, '', $path );
				capitola_child_include_files_in_folder( $subdir );
			} elseif ( preg_match( '/\.php$/', $path ) ) {
				require_once $path;
			}
		}
	}
}

// Defer child theme includes until after parent theme is loaded.
add_action(
	'after_setup_theme',
	function () {
		capitola_child_include_files_in_folder( 'includes' );
	},
	11
);
