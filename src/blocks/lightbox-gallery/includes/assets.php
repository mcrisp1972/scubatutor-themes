<?php

namespace Capitola\Blocks\Lightbox_Gallery;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-lightbox-gallery', CAPITOLA_BLOCKS_URL . 'lightbox-gallery/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
