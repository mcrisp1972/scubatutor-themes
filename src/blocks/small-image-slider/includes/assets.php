<?php

namespace cwps\blocks\smallImageSliderSlider;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-smallImageSlider', CAPITOLA_BLOCKS_URL . 'small-image-slider/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
