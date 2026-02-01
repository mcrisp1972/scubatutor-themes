<?php

namespace Capitola\Blocks\Three_Link_Cards_With_Intro;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );

function register_assets() {
	wp_register_style( 'capitola-three-link-cards-with-intro', CAPITOLA_BLOCKS_URL . 'three-link-cards/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
