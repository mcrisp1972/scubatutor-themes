<?php

namespace cwps\pages\settings;

use cwps\adminForms\Capitola_Settings_Form;

const GROUP_PAGES = 'cwps-page-options';

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

function add_options_page() {

	new Capitola_Settings_Form(
		array(
			'parent_slug' => 'edit.php?post_type=page',
			'page_title' => 'Page Settings',
			'menu_title' => 'Page Settings',
			'menu_slug' => GROUP_PAGES,
			'position' => 50,
			'fields' => array(
				array(
					'type' => 'title',
				),
				array(
					'id' => 'post-fallback-img',
					'label' => 'Fallback Image',
					'name' => 'cwps_page_default_image',
					'option' => 'cwps_page_default_image',
					'type' => 'image',
					'help' => 'Sets the fallback featured image if no image is set at the post or term level.',
				),
				array(
					'type' => 'sectionend',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\register_settings' );

function register_settings() {
	register_setting(
		GROUP_PAGES,
		'cwps_page_default_image',
		array(
			'type' => 'integer',
			'show_in_rest' => false,
			'default' => 0,
		)
	);
}
