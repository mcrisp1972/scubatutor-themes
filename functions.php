<?php
/**
 * Capitola functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package capitola
 */

define( 'CAPITOLA_THEME_DIR', get_template_directory() );
define( 'CAPITOLA_THEME_URL', get_template_directory_uri() );
define( 'CAPITOLA_IMAGES_URL', CAPITOLA_THEME_URL . '/assets/images/' );
define( 'CAPITOLA_JS_URL', CAPITOLA_THEME_URL . '/build/scripts/' );
define( 'CAPITOLA_CSS_URL', CAPITOLA_THEME_URL . '/build/styles/' );
define( 'CAPITOLA_CSS_DIR', CAPITOLA_THEME_DIR . '/build/styles/' );
define( 'CAPITOLA_BLOCKS_URL', CAPITOLA_THEME_URL . '/build/blocks/' );
define( 'CAPITOLA_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'CAPITOLA_CHILD_THEME_URL', get_stylesheet_directory_uri() );
define( 'CAPITOLA_CHILD_IMAGES_URL', CAPITOLA_CHILD_THEME_URL . '/assets/images/' );
define( 'CAPITOLA_CHILD_JS_URL', CAPITOLA_CHILD_THEME_URL . '/build/scripts/' );
define( 'CAPITOLA_CHILD_CSS_URL', CAPITOLA_CHILD_THEME_URL . '/build/styles/' );
define( 'CAPITOLA_CHILD_CSS_DIR', CAPITOLA_CHILD_THEME_DIR . '/build/styles/' );
define( 'CAPITOLA_CHILD_BLOCKS_URL', CAPITOLA_CHILD_THEME_URL . '/build/blocks/' );
define( 'CAPITOLA_STYLE_DEP', 'capitola-main-styles' );
define( 'CAPITOLA_WOO_ACTIVE', class_exists( 'woocommerce' ) ? true : false );

$capitola_asset_file = CAPITOLA_THEME_DIR . '/build/styles/main.asset.php';
$capitola_asset_version = file_exists( $capitola_asset_file ) ? require $capitola_asset_file : false;
define( 'CAPITOLA_THEME_VER', $capitola_asset_version ? $capitola_asset_version['version'] : wp_get_theme()->get( 'Version' ) );

$capitola_child_asset_file = CAPITOLA_CHILD_THEME_DIR . '/build/styles/main.asset.php';
$capitola_child_asset_version = file_exists( $capitola_child_asset_file ) ? require $capitola_child_asset_file : false;
define( 'CAPITOLA_CHILD_THEME_VER', $capitola_child_asset_version ? $capitola_child_asset_version['version'] : wp_get_theme()->get( 'Version' ) );

function capitola_include_files_in_folder( $folder ) {
	if ( ! empty( $folder ) ) {
		foreach ( glob( __DIR__ . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . '*' ) as $path ) {
			if ( is_dir( $path ) ) {
				$subdir = str_replace( __DIR__ . DIRECTORY_SEPARATOR, '', $path );
				capitola_include_files_in_folder( $subdir );
			} elseif ( preg_match( '/\.php$/', $path ) ) {
				require_once $path;
			}
		}
	}
}

require_once CAPITOLA_THEME_DIR . '/includes/autoloader.php';

capitola_include_files_in_folder( 'includes' );
