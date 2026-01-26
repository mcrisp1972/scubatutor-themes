<?php

namespace cwps\navMegaNav;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-navMegaNav', CWPS_THEME_BLOCKS_URL . 'nav-mega-nav/style-index.css', array( CWPS_STYLE_DEP, 'cwps-siteHeader' ), CWPS_THEME_VER );
}
