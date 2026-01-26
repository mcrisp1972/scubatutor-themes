<?php

namespace cwps\posts\registrations;

add_filter( 'register_post_type_args', __NAMESPACE__ . '\edit_post_registration', 99, 2 );

function edit_post_registration( $args, $post_type ) {

	if ( $post_type === 'post' ) {

		// add template
		$args['template'] = array(
			array( 'cwps/post-hero' ),
		);

		// disable archive
		$args['has_archive'] = false;
	}

	return $args;
}

add_action( 'init', __NAMESPACE__ . '\register_post_meta' );

function register_post_meta() {

	register_meta(
		'post',
		'useDefColorTheme',
		array(
			'auth_callback' => '__return_true',
			'default'       => true,
			'show_in_rest'  => true,
			'single'        => true,
			'type'          => 'boolean',
		)
	);

	register_meta(
		'post',
		'pageColorTheme',
		array(
			'auth_callback' => '__return_true',
			'default'       => '',
			'show_in_rest'  => true,
			'single'        => true,
			'type'          => 'string',
		)
	);

	register_term_meta(
		'category',
		'term_thumb_id',
		array(
			'type' => 'integer',
			'default' => 0,
			'show_in_rest' => true,
			'single' => true,
		)
	);

	register_term_meta(
		'category',
		'term_page_id',
		array(
			'type' => 'integer',
			'default' => 0,
			'show_in_rest' => true,
			'single' => true,
		)
	);
}
