<?php

namespace cwps\formBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-formBlock', CWPS_THEME_BLOCKS_URL . 'form-block/style-index.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-WPForms', CWPS_THEME_CSS_URL . 'blocks/wp-forms.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-GForm', CWPS_THEME_CSS_URL . 'blocks/gravity-forms.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
