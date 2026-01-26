<?php

namespace cwps\accordionWithIntro;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-accordionWithIntro', CWPS_THEME_BLOCKS_URL . 'accordion-with-intro/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
