<?php

namespace Capitola\Post_Types\Posts\Rest_Api;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds filtered_listings param to the posts collection.
 *
 * @param array $params REST collection params.
 * @return array
 */
function add_filtered_listings_param( $params ) {

	$params['filtered_listings'] = array(
		'description' => 'Apply term filtering rules for filtered listings.',
		'type'        => 'boolean',
		'default'     => false,
		'required'    => false,
	);

	return $params;
}

/**
 * Returns byline data for a post.
 *
 * @return array
 */
function get_post_byline() {
	$author_id    = get_the_author_meta( 'ID' );
	$author_image = get_user_meta( $author_id, 'userProfilePhoto', true );

	return array(
		'author_id'    => $author_id,
		'author_image' => wp_get_attachment_image_url( $author_image, 'thumbnail' ),
		'name'         => get_the_author_meta( 'display_name' ),
		'date'         => get_the_date( "M jS 'y" ),
	);
}

/**
 * Returns the first category name for a post.
 *
 * @param array $post REST post data.
 * @return string|null
 */
function get_post_category_name( $post ) {
	if ( ! empty( $post['categories'] ) ) {
		$term = get_term( $post['categories'][0] );
		if ( $term ) {
			return $term->name;
		}
	}

	return null;
}

/**
 * Returns the CTA label for a post.
 *
 * @return string
 */
function get_post_cta_label() {
	return apply_filters( 'capitola_post_cta_label', '' );
}

/**
 * Updates REST post query args for filtered listings.
 *
 * @param array           $args    Query args.
 * @param WP_REST_Request $request REST request.
 * @return array
 */
function filter_rest_post_query( $args, $request ) {
	$params = $request->get_params();

	if ( ! empty( $params['filtered_listings'] ) && isset( $args['tax_query'] ) ) {
		$key = array_search( 'category', array_column( $args['tax_query'], 'taxonomy' ), true );
		if ( false !== $key ) {
			$args['tax_query'][ $key ]['include_children'] = true;
		}
	}

	return $args;
}

/**
 * Extends the REST API for posts.
 *
 * @return void
 */
function extend_rest_endpoint() {

	add_filter( 'rest_post_collection_params', __NAMESPACE__ . '\add_filtered_listings_param', 10, 1 );

	register_rest_field(
		'post',
		'byline',
		array(
			'get_callback' => __NAMESPACE__ . '\get_post_byline',
		)
	);

	register_rest_field(
		'post',
		'category_name',
		array(
			'get_callback' => __NAMESPACE__ . '\get_post_category_name',
		)
	);

	register_rest_field(
		array( 'post' ),
		'cta_label',
		array(
			'get_callback' => __NAMESPACE__ . '\get_post_cta_label',
		)
	);

	add_filter( 'rest_post_query', __NAMESPACE__ . '\filter_rest_post_query', 10, 2 );
}

add_action( 'rest_api_init', __NAMESPACE__ . '\extend_rest_endpoint' );
