<?php

namespace Capitola\Post_Types\Pages\Settings;

use Capitola\Admin_Forms\Settings_Form;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const GROUP_PAGES = 'capitola-page-options';

/**
 * Registers the pages settings page.
 *
 * @return void
 */
function add_options_page() {

	new Settings_Form(
		array(
			'parent_slug' => 'edit.php?post_type=page',
			'page_title'  => 'Page Settings',
			'menu_title'  => 'Page Settings',
			'menu_slug'   => GROUP_PAGES,
			'position'    => 50,
			'fields'      => array(
				array(
					'id'     => 'post-fallback-img',
					'label'  => 'Fallback Image',
					'name'   => 'capitola_page_default_image',
					'option' => 'capitola_page_default_image',
					'type'   => 'media',
					'help'   => 'Sets the fallback featured image if no image is set at the post or term level.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

/**
 * Registers settings used by the pages options page.
 *
 * @return void
 */
function register_settings() {
	register_setting(
		GROUP_PAGES,
		'capitola_page_default_image',
		array(
			'type'         => 'integer',
			'show_in_rest' => false,
			'default'      => 0,
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\register_settings' );
