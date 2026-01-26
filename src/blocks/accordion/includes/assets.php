<?php

namespace cwps\cwpsAccordion;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-accordion', CWPS_THEME_BLOCKS_URL . 'accordion/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );

	wp_register_style( 'cwps-accordion-editor', CWPS_THEME_BLOCKS_URL . 'accordion/index.css', array( CWPS_STYLE_DEP, 'cwps-accordion' ), CWPS_THEME_VER );
}
