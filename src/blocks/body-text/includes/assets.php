<?php

namespace cwps\cwpsBlockBodyText;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-blockBodyText', CWPS_THEME_BLOCKS_URL . 'body-text/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
