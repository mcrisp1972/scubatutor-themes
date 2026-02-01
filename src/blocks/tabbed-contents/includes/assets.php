<?php

namespace Capitola\Blocks\Tabbed_Contents;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-tabbedContents', CAPITOLA_BLOCKS_URL . 'tabbed-contents/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
