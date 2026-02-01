<?php

namespace Capitola\Blocks\Lightbox_Gallery;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-lightboxGallery', CAPITOLA_BLOCKS_URL . 'lightbox-gallery/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
