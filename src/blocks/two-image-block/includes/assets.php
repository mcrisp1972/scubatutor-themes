<?php

namespace Capitola\Blocks\Two_Image_Block;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-twoImageBlock', CAPITOLA_BLOCKS_URL . 'two-image-block/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
