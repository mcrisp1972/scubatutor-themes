<?php

namespace cwps\navDropdown;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-navDropdown', CWPS_THEME_BLOCKS_URL . 'nav-dropdown/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
