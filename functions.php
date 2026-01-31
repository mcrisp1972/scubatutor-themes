<?php
/**
 * CrispSCUBAtheme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package crispscubatheme
 */

define( 'CWPS_THEME_DIR', get_template_directory() );
define( 'CWPS_THEME_URL', get_template_directory_uri() );
define( 'CWPS_IMAGES_URL', CWPS_THEME_URL . '/assets/images/' );
define( 'CWPS_THEME_JS_URL', CWPS_THEME_URL . '/build/scripts/' );
define( 'CWPS_THEME_CSS_URL', CWPS_THEME_URL . '/build/styles/' );
define( 'CWPS_THEME_CSS_DIR', CWPS_THEME_DIR . '/build/styles/' );
define( 'CWPS_THEME_BLOCKS_URL', CWPS_THEME_URL . '/build/blocks/' );
define( 'CWPS_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'CWPS_CHILD_THEME_URL', get_stylesheet_directory_uri() );
define( 'CWPS_CHILD_IMAGES_URL', CWPS_CHILD_THEME_URL . '/assets/images/' );
define( 'CWPS_CHILD_THEME_JS_URL', CWPS_CHILD_THEME_URL . '/build/scripts/' );
define( 'CWPS_CHILD_THEME_CSS_URL', CWPS_CHILD_THEME_URL . '/build/styles/' );
define( 'CWPS_CHILD_THEME_CSS_DIR', CWPS_CHILD_THEME_DIR . '/build/styles/' );
define( 'CWPS_CHILD_THEME_BLOCKS_URL', CWPS_CHILD_THEME_URL . '/build/blocks/' );
define( 'CWPS_STYLE_DEP', 'cwps-main-styles' );
define( 'CWPS_WOO_ACTIVE', class_exists( 'woocommerce' ) ? true : false );

$asset_file = CWPS_THEME_DIR . '/build/styles/main.asset.php';
$asset_version = file_exists( $asset_file ) ? require $asset_file : false;
define( 'CWPS_THEME_VER', $asset_version ? $asset_version['version'] : wp_get_theme()->get( 'Version' ) );

$asset_file = CWPS_CHILD_THEME_DIR . '/build/styles/main.asset.php';
$asset_version = file_exists( $asset_file ) ? require $asset_file : false;
define( 'CWPS_CHILD_THEME_VER', $asset_version ? $asset_version['version'] : wp_get_theme()->get( 'Version' ) );

function cwps_include_files_in_folder( $folder ) {
	if ( ! empty( $folder ) ) {
		foreach ( glob( __DIR__ . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . '*' ) as $path ) {
			if ( is_dir( $path ) ) {
				$subdir = str_replace( __DIR__ . DIRECTORY_SEPARATOR, '', $path );
				cwps_include_files_in_folder( $subdir );
			} elseif ( preg_match( '/\.php$/', $path ) ) {
				require_once $path;
			}
		}
	}
}

require_once CWPS_THEME_DIR . '/includes/autoloader.php';

cwps_include_files_in_folder( 'includes' );

// doesn't work
// register_activation_hook( __FILE__, 'cwps\Activate\activate' );


// add_action( 'admin_enqueue_scripts', 'display_admin_enqueued_stylesheets' );
// function display_admin_enqueued_stylesheets() {
// global $wp_styles; // Access the global WP_Styles object
// echo '<pre>'; // Use <pre> for formatted output
// print_r( $wp_styles->queue ); // Print the queue of enqueued stylesheets
// echo '</pre>';


// error_log(print_r($wp_styles, 1));
// }
