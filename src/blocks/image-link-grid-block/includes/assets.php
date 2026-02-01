<?php

namespace Capitola\Blocks\Image_Link_Grid_Block;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-imageLinkGridBlock', CAPITOLA_BLOCKS_URL . 'image-link-grid-block/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
