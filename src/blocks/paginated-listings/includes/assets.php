<?php

namespace cwps\paginatedListings;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-post-listing', CAPITOLA_CSS_URL . 'blocks/archive-list.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-post-filters', CAPITOLA_CSS_URL . 'blocks/listings-filters.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'cwps-page-navigation', CAPITOLA_CSS_URL . 'blocks/page-navigation.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
