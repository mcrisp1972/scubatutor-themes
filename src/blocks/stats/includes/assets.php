<?php

namespace Capitola\Blocks\Stats;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-stats', CAPITOLA_BLOCKS_URL . 'stats/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
