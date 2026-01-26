<?php

namespace cwps\imageLinkGridBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-imageLinkGridBlock', CWPS_THEME_BLOCKS_URL . 'image-link-grid-block/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
