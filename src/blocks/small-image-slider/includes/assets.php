<?php

namespace cwps\blocks\smallImageSliderSlider;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-smallImageSlider', CWPS_THEME_BLOCKS_URL . 'small-image-slider/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
