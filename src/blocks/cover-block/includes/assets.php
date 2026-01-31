<?php

namespace cwps\coverBlock;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 99 );

function register_assets() {
	wp_register_style( 'cwps-coverBlock', CAPITOLA_BLOCKS_URL . 'cover-block/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
