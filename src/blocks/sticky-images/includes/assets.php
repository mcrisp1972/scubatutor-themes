<?php

namespace cwps\stickyImages;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-stickyImages', CWPS_THEME_BLOCKS_URL . 'sticky-images/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-stickyImages-admin', CWPS_THEME_BLOCKS_URL . 'sticky-images/index.css', array( CWPS_STYLE_DEP, 'cwps-stickyImages' ), CWPS_THEME_VER );
}
