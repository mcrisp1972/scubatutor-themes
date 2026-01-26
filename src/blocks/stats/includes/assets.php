<?php

namespace cwps\stats;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-stats', CWPS_THEME_BLOCKS_URL . 'stats/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
