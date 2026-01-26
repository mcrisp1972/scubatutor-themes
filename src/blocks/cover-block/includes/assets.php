<?php

namespace cwps\coverBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 99 );

function register_assets() {
	wp_register_style( 'cwps-coverBlock', CWPS_THEME_BLOCKS_URL . 'cover-block/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
