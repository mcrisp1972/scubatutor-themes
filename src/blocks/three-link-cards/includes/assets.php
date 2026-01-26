<?php

namespace cwps\threeLinkCardsWithIntro;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-threeLinkCardsWithIntro', CWPS_THEME_BLOCKS_URL . 'three-link-cards/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
