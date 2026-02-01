<?php

namespace Capitola\Blocks\Nav_Mega_Nav;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-navMegaNav', CAPITOLA_BLOCKS_URL . 'nav-mega-nav/style-index.css', array( CAPITOLA_STYLE_DEP, 'cwps-siteHeader' ), CAPITOLA_THEME_VER );
}
