<?php

namespace Capitola\Blocks\Accordion_With_Intro;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-accordion-with-intro', CAPITOLA_BLOCKS_URL . 'accordion-with-intro/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
