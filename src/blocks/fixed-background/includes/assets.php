<?php

namespace Capitola\Blocks\Fixed_Background;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-fixed-background', CAPITOLA_BLOCKS_URL . 'fixed-background/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );

	wp_register_style( 'capitola-fixed-background-editor', CAPITOLA_BLOCKS_URL . 'fixed-background/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-fixed-background' ), CAPITOLA_THEME_VER );
}
