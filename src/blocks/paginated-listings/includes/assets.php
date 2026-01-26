<?php

namespace cwps\paginatedListings;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-post-listing', CWPS_THEME_CSS_URL . 'blocks/archive-list.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-post-filters', CWPS_THEME_CSS_URL . 'blocks/listings-filters.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
	wp_register_style( 'cwps-page-navigation', CWPS_THEME_CSS_URL . 'blocks/page-navigation.css', array( CWPS_STYLE_DEP ), CWPS_THEME_VER );
}
