<?php

namespace Capitola\Post_Types\Posts\Rest_Api;

add_action( 'rest_api_init', __NAMESPACE__ . '\extend_rest_endpoint' );

function extend_rest_endpoint() {

	add_filter(
		'rest_post_collection_params',
		function ( $params ) {

			$params['filtered_listings'] = array(
				'description' => 'Apply term filtering rules for filtered listings.',
				'type' => 'boolean',
				'default' => false,
				'required' => false,
			);

			return $params;
		},
		99,
		1
	);

	register_rest_field(
		'post',
		'byline',
		array(
			'get_callback' => function ( $post, $field_name, $request ) {
				$author_id = get_the_author_meta( 'ID' );
				$author_image = get_user_meta( $author_id, 'userProfilePhoto', true );

				return array(
					'author_id' => $author_id,
					'author_image' => wp_get_attachment_image_url( $author_image, 'thumbnail' ),
					'name' => get_the_author_meta( 'display_name' ),
					'date' => get_the_date( "M jS 'y" ),
				);
			},
		)
	);

	register_rest_field(
		'post',
		'category_name',
		array(
			'get_callback' => function ( $post, $field_name, $request ) {
				if ( ! empty( $post['categories'] ) ) {
					$term = get_term( $post['categories'][0] );
					if ( $term ) {
						return $term->name;
					}
				}
			},
		)
	);

	register_rest_field(
		array( 'post' ),
		'cta_label',
		array(
			'get_callback' => function ( $post ) {
				return apply_filters( 'capitola_post_cta_label', '' );
			},
		)
	);

	add_filter(
		'rest_post_query',
		function ( $args, $request ) {
			$params = $request->get_params();

			if ( $params['filtered_listings'] && isset( $args['tax_query'] ) ) {
				$key = array_search( 'category', array_column( $args['tax_query'], 'taxonomy' ) );
				if ( $key !== false ) {
					$args['tax_query'][ $key ]['include_children'] = true;
				}
			}

			return $args;
		},
		99,
		2
	);
}
