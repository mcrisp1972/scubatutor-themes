<?php

namespace cwps\cli;

// Include CLI command classes
require_once CAPITOLA_THEME_DIR . '/includes/cli/classes/Block_Attribute_Rename.php';

function register_commands() {
	\WP_CLI::add_command( 'cwps-rename-block-attribute', '\cwps\cli\Block_Attribute_Rename' );
}

add_action( 'cli_init', __NAMESPACE__ . '\register_commands' );
