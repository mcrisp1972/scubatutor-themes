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
define( 'CAPITOLA_STYLE_DEP', 'cwps-main-styles' );
define( 'CAPITOLA_WOO_ACTIVE', class_exists( 'woocommerce' ) ? true : false );

$asset_file = CAPITOLA_THEME_DIR . '/build/styles/main.asset.php';
$asset_version = file_exists( $asset_file ) ? require $asset_file : false;
define( 'CAPITOLA_THEME_VER', $asset_version ? $asset_version['version'] : wp_get_theme()->get( 'Version' ) );

$asset_file = CAPITOLA_CHILD_THEME_DIR . '/build/styles/main.asset.php';
$asset_version = file_exists( $asset_file ) ? require $asset_file : false;
define( 'CAPITOLA_CHILD_THEME_VER', $asset_version ? $asset_version['version'] : wp_get_theme()->get( 'Version' ) );

function capitola_include_files_in_folder( $folder ) {
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

require_once CAPITOLA_THEME_DIR . '/includes/autoloader.php';

capitola_include_files_in_folder( 'includes' );

// doesn't work
// register_activation_hook( __FILE__, 'Capitola\Activate\activate' );


// add_action( 'admin_enqueue_scripts', 'display_admin_enqueued_stylesheets' );
// function display_admin_enqueued_stylesheets() {
// global $wp_styles; // Access the global WP_Styles object
// echo '<pre>'; // Use <pre> for formatted output
// print_r( $wp_styles->queue ); // Print the queue of enqueued stylesheets
// echo '</pre>';


// error_log(print_r($wp_styles, 1));
// }
