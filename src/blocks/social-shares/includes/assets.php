<?php

namespace Capitola\Blocks\Social_Shares;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-social-shares', CAPITOLA_BLOCKS_URL . 'social-shares/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
