<?php

namespace Capitola\Blocks\Link_List;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-link-list', CAPITOLA_BLOCKS_URL . 'link-list/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
