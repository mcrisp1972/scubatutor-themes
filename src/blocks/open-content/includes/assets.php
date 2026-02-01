<?php

namespace Capitola\Blocks\Open_Content;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-open-content', CAPITOLA_BLOCKS_URL . 'open-content/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
