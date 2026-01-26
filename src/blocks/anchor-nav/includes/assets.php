<?php

namespace cwps\cwpsAnchorNav;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-anchorNav', CWPS_THEME_BLOCKS_URL . 'anchor-nav/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );

	wp_register_style( 'cwps-anchorNav-editor', CWPS_THEME_BLOCKS_URL . 'anchor-nav/index.css', array( CWPS_STYLE_DEP, 'cwps-anchorNav' ), CWPS_THEME_VER );
}
