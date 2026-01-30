<?php

namespace cwps\footer;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 99 );

function register_assets() {
	wp_register_style( 'cwps-footer', CWPS_THEME_BLOCKS_URL . 'footer/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-footerAdmin', CWPS_THEME_BLOCKS_URL . 'footer/index.css', array( CWPS_STYLE_DEP, 'cwps-footer' ), CWPS_THEME_VER );
}
