<?php

namespace Capitola\Blocks\Anchor_Nav;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-anchor-nav', CAPITOLA_BLOCKS_URL . 'anchor-nav/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );

	wp_register_style( 'capitola-anchor-nav-editor', CAPITOLA_BLOCKS_URL . 'anchor-nav/index.css', array( CAPITOLA_STYLE_DEP, 'capitola-anchor-nav' ), CAPITOLA_THEME_VER );
}
