<?php

namespace Capitola_Child\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register all blocks in the child theme.
 *
 * @return void
 */
function register_blocks() {

	foreach ( glob( get_stylesheet_directory() . '/build/blocks/*' ) as $path ) {
		if ( is_dir( $path ) && file_exists( $path . '/block.json' ) ) {
			register_block_type( $path . '/block.json' );

			if ( is_dir( $path . '/includes' ) ) {
				foreach ( glob( $path . '/includes/*' ) as $file ) {
					require_once $file;
				}
			}
		}
	}

	// wp_register_block_types_from_metadata_collection(
	// CAPITOLA_CHILD_THEME_DIR . '/build/blocks',
	// CAPITOLA_CHILD_THEME_DIR . '/build/blocks-manifest.php'
	// );.
}

add_action( 'init', __NAMESPACE__ . '\register_blocks' );

add_filter(
	'capitola_unregistered_parent_blocks',
	function () {
		return array(
			'capitola/footer',
		);
	}
);
