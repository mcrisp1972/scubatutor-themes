<?php

namespace cwps\accordionWithIntro;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-accordionWithIntro', CAPITOLA_BLOCKS_URL . 'accordion-with-intro/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
