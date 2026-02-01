<?php

namespace Capitola\Blocks\Simple_Spacer;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-simpleSpacer', CAPITOLA_BLOCKS_URL . 'simple-spacer/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
