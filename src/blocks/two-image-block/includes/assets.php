<?php

namespace cwps\twoImageBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-twoImageBlock', CWPS_THEME_BLOCKS_URL . 'two-image-block/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
