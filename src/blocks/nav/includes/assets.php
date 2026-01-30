<?php

namespace cwps\navHeader;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {

	wp_register_style( 'cwps-siteHeader', CWPS_THEME_BLOCKS_URL . 'nav/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-siteHeaderAdmin', CWPS_THEME_BLOCKS_URL . 'nav/index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
