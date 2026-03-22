<?php

namespace Capitola\Rest_Api\Post_Images;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds attachment image URLs to REST responses.
 *
 * @param array $post REST post data.
 * @return array
 */
function post_add_images( $post ) {
	$image_id = get_post_thumbnail_id( $post['id'] );
	return array(
		'thumbnail'    => $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '',
		'medium'       => $image_id ? wp_get_attachment_image_url( $image_id, 'medium' ) : '',
		'medium-large' => $image_id ? wp_get_attachment_image_url( $image_id, 'medium_large' ) : '',
		'large'        => $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : '',
	);
}

/**
 * Adds attachment image HTML to REST responses.
 *
 * @param array $post REST post data.
 * @return array
 */
function post_add_image_html( $post ) {
	$image_id = get_post_thumbnail_id( $post['id'] );
	return array(
		'thumbnail'    => $image_id ? wp_get_attachment_image( $image_id, 'thumbnail' ) : '',
		'medium'       => $image_id ? wp_get_attachment_image( $image_id, 'medium' ) : '',
		'medium-large' => $image_id ? wp_get_attachment_image( $image_id, 'medium_large' ) : '',
		'large'        => $image_id ? wp_get_attachment_image( $image_id, 'large' ) : '',
	);
}

/**
 * Adds term thumbnail image URLs to REST responses.
 *
 * @param int|array|\WP_Term $term Term ID, array, or object.
 * @return array
 */
function term_add_images( $term ) {
	$image_id = \Capitola\Helpers\Images\term_thumb_id( $term );
	return array(
		'thumbnail'    => $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '',
		'medium'       => $image_id ? wp_get_attachment_image_url( $image_id, 'medium' ) : '',
		'medium-large' => $image_id ? wp_get_attachment_image_url( $image_id, 'medium-large' ) : '',
		'large'        => $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : '',
	);
}

/**
 * Registers REST fields for post and term images.
 *
 * @return void
 */
function post_add_image() {

	$post_types = apply_filters( 'capitola_rest_post_type_has_image_props', array( 'post', 'page' ) );
	$taxonomies = apply_filters( 'capitola_rest_tax_has_image_props', array( 'category' ) );

	register_rest_field(
		$post_types,
		'thumbnail_urls',
		array(
			'get_callback' => __NAMESPACE__ . '\post_add_images',
		)
	);

	register_rest_field(
		$post_types,
		'image_html',
		array(
			'get_callback' => __NAMESPACE__ . '\post_add_image_html',
		)
	);

	register_rest_field(
		$taxonomies,
		'thumbnail_urls',
		array(
			'get_callback' => __NAMESPACE__ . '\term_add_images',
		)
	);
}

add_action( 'rest_api_init', __NAMESPACE__ . '\post_add_image' );
