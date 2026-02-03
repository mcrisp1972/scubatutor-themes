<?php

namespace Capitola\Post_Types\Posts\Registrations;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adjusts post type registration arguments for posts.
 *
 * @param array  $args      Post type args.
 * @param string $post_type Post type name.
 * @return array
 */
function edit_post_registration( $args, $post_type ) {

	if ( 'post' === $post_type ) {

		// add template.
		$args['template'] = array(
			array( 'capitola/post-hero' ),
		);

		// disable archive.
		$args['has_archive'] = false;
	}

	return $args;
}

add_filter( 'register_post_type_args', __NAMESPACE__ . '\edit_post_registration', 10, 2 );

/**
 * Registers post and term meta used by the theme.
 *
 * @return void
 */
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
			'type'         => 'integer',
			'default'      => 0,
			'show_in_rest' => true,
			'single'       => true,
		)
	);

	register_term_meta(
		'category',
		'term_page_id',
		array(
			'type'         => 'integer',
			'default'      => 0,
			'show_in_rest' => true,
			'single'       => true,
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\register_post_meta' );
