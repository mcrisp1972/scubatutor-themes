<?php

namespace Capitola\Users\Registrations;

use Capitola\Admin_Forms\User_Form;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers user meta used by the theme.
 *
 * @return void
 */
function register_user_meta() {

	register_meta(
		'user',
		'userProfilePhoto',
		array(
			'type'         => 'number',
			'single'       => true,
			'show_in_rest' => true,
			'default'      => 0,
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\register_user_meta' );

/**
 * Adds custom user fields to the profile.
 *
 * @return void
 */
function add_user_fields() {
	new User_Form(
		array(
			'priority' => 5,
			'fields'   => array(
				array(
					'type'    => 'sectionstart',
					'heading' => 'Public User Details',
				),
				array(
					'id'    => 'userProfilePhoto',
					'label' => 'Profile Picture',
					'name'  => 'userProfilePhoto',
					'type'  => 'media',
					'help'  => 'Photo to display where post author details are displayed.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_user_fields' );
