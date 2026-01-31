<?php

namespace cwps\posts\settings;

use cwps\adminForms\Capitola_Settings_Form;

const GROUP_POSTS = 'cwps-post-options';

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

function add_options_page() {

	new Capitola_Settings_Form(
		array(
			'parent_slug' => 'edit.php',
			'page_title' => 'Blog Settings',
			'menu_title' => 'Blog Settings',
			'menu_slug' => GROUP_POSTS,
			'position' => 50,
			'fields' => array(
				array(
					'type' => 'title',
				),
				array(
					'id' => 'post-fallback-img',
					'label' => 'Fallback Image',
					'name' => 'cwps_post_default_image',
					'option' => 'cwps_post_default_image',
					'type' => 'image',
					'help' => 'Sets the fallback featured image if no image is set at the post or term level.',
				),
				array(
					'id' => 'post-listing-id',
					'label' => 'Posts Listing Page',
					'name' => 'cwps_post_listing_page',
					'option' => 'cwps_post_listing_page',
					'type' => 'page_select',
					'help' => 'Select the listing page for posts.',
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
		GROUP_POSTS,
		'cwps_post_default_image',
		array(
			'type' => 'integer',
			'show_in_rest' => false,
			'default' => 0,
		)
	);

	register_setting(
		GROUP_POSTS,
		'cwps_post_listing_page',
		array(
			'type' => 'integer',
			'show_in_rest' => false,
			'default' => 0,
		)
	);
}
