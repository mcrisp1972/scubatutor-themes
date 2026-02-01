<?php

namespace Capitola\Blocks\Nav;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {

	wp_register_style( 'cwps-siteHeader', CAPITOLA_BLOCKS_URL . 'nav/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-siteHeaderAdmin', CAPITOLA_BLOCKS_URL . 'nav/index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
