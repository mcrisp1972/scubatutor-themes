<?php

namespace Capitola\Rest_Api\Post_Images;

add_action( 'rest_api_init', __NAMESPACE__ . '\post_add_image' );

function post_add_image() {

	$post_types = apply_filters( 'capitola_rest_post_types_has_image', array( 'post', 'page' ) );
	$taxonomies = apply_filters( 'capitola_rest_tax_has_image', array( 'category' ) );

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

function post_add_images( $post, $field_name, $request ) {

	$image_id = get_post_thumbnail_id( $post['id'] );
	return array(
		'thumbnail' => $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '',
		'medium' => $image_id ? wp_get_attachment_image_url( $image_id, 'medium' ) : '',
		'large' => $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : '',
	);
}

function post_add_image_html( $post, $field_name, $request ) {

	$image_id = get_post_thumbnail_id( $post['id'] );
	return array(
		'thumbnail' => $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '',
		'medium-large' => $image_id ? wp_get_attachment_image( $image_id, 'medium_large' ) : '',
		'large' => $image_id ? wp_get_attachment_image( $image_id, 'large' ) : '',
	);
}

function term_add_images( $term, $field_name, $request ) {
	$image_id = \Capitola\Helpers\Images\term_thumb_id( $term );
	return array(
		'thumbnail' => $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '',
		'medium' => $image_id ? wp_get_attachment_image_url( $image_id, 'medium' ) : '',
		'large' => $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : '',
	);
}
