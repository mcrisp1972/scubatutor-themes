<?php

namespace Capitola\Blocks\Background_Image;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-backgroundImage', CAPITOLA_BLOCKS_URL . 'bg-image-text/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
