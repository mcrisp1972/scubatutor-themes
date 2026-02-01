<?php

namespace Capitola\Blocks\Icons;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-icons', CAPITOLA_BLOCKS_URL . 'icons/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
