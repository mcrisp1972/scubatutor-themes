<?php

namespace cwps\socialShares;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-socialShares', CWPS_THEME_BLOCKS_URL . 'social-shares/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
