<?php

namespace cwps\sideImage;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-sideImage', CWPS_THEME_BLOCKS_URL . 'side-image/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-sideImage-editor', CWPS_THEME_BLOCKS_URL . 'side-image/index.css', array( CWPS_STYLE_DEP, 'cwps-sideImage' ), CWPS_THEME_VER );
}
