<?php

namespace Capitola\Blocks\Sticky_Images;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-sticky-images', CAPITOLA_BLOCKS_URL . 'sticky-images/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-sticky-images-editor', CAPITOLA_BLOCKS_URL . 'sticky-images/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-sticky-images' ), CAPITOLA_THEME_VER );
}
