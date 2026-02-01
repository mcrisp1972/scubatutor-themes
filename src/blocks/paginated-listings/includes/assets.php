<?php

namespace Capitola\Blocks\Paginated_Listings;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-post-listing', CAPITOLA_CSS_URL . 'blocks/archive-list.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-post-filters', CAPITOLA_CSS_URL . 'blocks/listings-filters.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
	wp_register_style( 'capitola-page-navigation', CAPITOLA_CSS_URL . 'blocks/page-navigation.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
