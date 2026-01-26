<?php

namespace cwps\iframeWrapper;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-iframeWrapper', CWPS_THEME_BLOCKS_URL . 'iframe-wrapper/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-iframeWrapperEdit', CWPS_THEME_BLOCKS_URL . 'iframe-wrapper/index.css', array( CWPS_STYLE_DEP, 'cwps-iframeWrapper' ), CWPS_THEME_VER );
}
