<?php

namespace Capitola\Blocks\Nav_Dropdown;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-navDropdown', CAPITOLA_BLOCKS_URL . 'nav-dropdown/style-index.css', array( CAPITOLA_STYLE_DEP, 'cwps-siteHeader' ), CAPITOLA_THEME_VER );
}
