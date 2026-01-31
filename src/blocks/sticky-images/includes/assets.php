<?php

namespace cwps\stickyImages;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-stickyImages', CAPITOLA_BLOCKS_URL . 'sticky-images/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-stickyImages-admin', CAPITOLA_BLOCKS_URL . 'sticky-images/index.css', array( CAPITOLA_STYLE_DEP, 'cwps-stickyImages' ), CAPITOLA_THEME_VER );
}
