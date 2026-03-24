<?php

namespace Capitola\Post_Types\Posts\Settings;

use Capitola\Admin_Forms\Settings_Form;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const GROUP_POSTS = 'capitola-post-options';

/**
 * Registers the posts settings page.
 *
 * @return void
 */
function add_options_page() {

	new Settings_Form(
		array(
			'parent_slug' => 'edit.php',
			'page_title'  => 'Blog Settings',
			'menu_title'  => 'Blog Settings',
			'menu_slug'   => GROUP_POSTS,
			'position'    => 50,
			'fields'      => array(
				array(
					'id'     => 'post-fallback-img',
					'label'  => 'Fallback Image',
					'name'   => 'capitola_post_default_image',
					'option' => 'capitola_post_default_image',
					'type'   => 'media',
					'help'   => 'Sets the fallback featured image if no image is set at the post or term level.',
				),
				array(
					'id'     => 'post-listing-id',
					'label'  => 'Posts Listing Page',
					'name'   => 'capitola_post_listing_page',
					'option' => 'capitola_post_listing_page',
					'type'   => 'page_select',
					'help'   => 'Select the listing page for posts.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_options_page' );

/**
 * Registers settings used by the posts options page.
 *
 * @return void
 */
function register_settings() {
	register_setting(
		GROUP_POSTS,
		'capitola_post_default_image',
		array(
			'type'         => 'integer',
			'show_in_rest' => false,
			'default'      => 0,
		)
	);

	register_setting(
		GROUP_POSTS,
		'capitola_post_listing_page',
		array(
			'type'         => 'integer',
			'show_in_rest' => false,
			'default'      => 0,
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\register_settings' );
