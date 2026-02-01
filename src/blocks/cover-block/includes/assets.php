<?php

namespace Capitola\Blocks\Cover_Block;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-cover-block', CAPITOLA_BLOCKS_URL . 'cover-block/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
