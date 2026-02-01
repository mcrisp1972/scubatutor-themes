<?php

namespace Capitola\Blocks\Side_Detailed_Link_List;

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 9999 );

function register_assets() {
	wp_register_style( 'cwps-sideDetailedLinkList', CAPITOLA_BLOCKS_URL . 'detailed-links/style-index.css', array( CAPITOLA_STYLE_DEP ), CAPITOLA_THEME_VER );
}
