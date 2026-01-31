<?php

namespace cwps\sideImage;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-sideImage', CAPITOLA_BLOCKS_URL . 'side-image/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-sideImage-editor', CAPITOLA_BLOCKS_URL . 'side-image/index.css', array( CAPITOLA_STYLE_DEP, 'cwps-sideImage' ), CAPITOLA_THEME_VER );
}
