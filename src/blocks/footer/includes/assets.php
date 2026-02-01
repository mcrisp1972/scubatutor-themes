<?php

namespace Capitola\Blocks\Footer;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-footer', CAPITOLA_BLOCKS_URL . 'footer/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-footerAdmin', CAPITOLA_BLOCKS_URL . 'footer/index.css', array( CAPITOLA_STYLE_DEP, 'cwps-footer' ), CAPITOLA_THEME_VER );
}
