<?php

namespace Capitola\Blocks\Accordion;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-accordion', CAPITOLA_BLOCKS_URL . 'accordion/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );

	wp_register_style( 'cwps-accordion-editor', CAPITOLA_BLOCKS_URL . 'accordion/index.css', array( CAPITOLA_STYLE_DEP, 'cwps-accordion' ), CAPITOLA_THEME_VER );
}
