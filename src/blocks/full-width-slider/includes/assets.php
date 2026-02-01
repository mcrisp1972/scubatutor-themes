<?php

namespace Capitola\Blocks\Full_Width_Slider;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-full-width-slider', CAPITOLA_BLOCKS_URL . 'full-width-slider/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
