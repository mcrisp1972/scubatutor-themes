<?php

namespace Capitola\Blocks\Iframe_Wrapper;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-iframe-wrapper', CAPITOLA_BLOCKS_URL . 'iframe-wrapper/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-iframe-wrapper-editor', CAPITOLA_BLOCKS_URL . 'iframe-wrapper/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-iframe-wrapper' ), CAPITOLA_THEME_VER );
}
