<?php

namespace cwps\fullWidthSlider;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-fullWidthSlider', CWPS_THEME_BLOCKS_URL . 'full-width-slider/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
