<?php

namespace cwps\fixedBackground;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-fixedBackground', CWPS_THEME_BLOCKS_URL . 'fixed-background/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );

	wp_register_style( 'cwps-fixedBackground-editor', CWPS_THEME_BLOCKS_URL . 'fixed-background/index.css', array( CWPS_STYLE_DEP, 'cwps-fixedBackground' ), CWPS_THEME_VER );
}
