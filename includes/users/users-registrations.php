<?php

namespace cwps\users\registrations;

use cwps\adminForms\Capitola_User_Form;

add_action( 'init', __NAMESPACE__ . '\register_user_meta', 0 );

function register_user_meta() {

	register_meta(
		'user',
		'userProfilePhoto',
		array(
			'type' => 'number',
			'single' => true,
			'show_in_rest' => true,
			'default' => 0,
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_user_fields', 99 );

function add_user_fields() {
	new Capitola_User_Form(
		array(
			'priority' => 5,
			'fields' => array(
				array(
					'title' => 'Public User Details',
					'type' => 'title',
				),
				array(
					'id' => 'userProfilePhoto',
					'label' => 'Profile Picture',
					'name' => 'userProfilePhoto',
					'type' => 'image',
					'help' => 'Photo to display where post author details are displayed.',
				),
				array(
					'type' => 'sectionend',
				),
			),
		)
	);
}
