<?php

namespace Capitola\Blocks\Block_Body_Text;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'cwps-blockBodyText', CAPITOLA_BLOCKS_URL . 'body-text/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
