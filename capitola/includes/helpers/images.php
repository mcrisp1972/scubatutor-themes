<?php

namespace Capitola\Helpers\Images;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the resolved image ID for a post, with term and post type fallback images if no featured image is set for the post.
 *
 * @param int|\WP_Post $post Post ID or object.
 * @return int|false
 */
function post_image_id( $post ) {

	if ( gettype( $post ) !== 'object' ) {
		$post = get_post( $post );
	}

	$id = apply_filters( "capitola_{$post->post_type}_fallback_image_id", false, $post );

	if ( ! $id ) {
		$taxonomy = apply_filters( "capitola_{$post->post_type}_base_taxonomy", 'post' === $post->post_type ? 'category' : false );

		if ( $taxonomy ) {
			$terms = get_the_terms( $post, $taxonomy );
			if ( $terms ) {
				shuffle( $terms );
				return term_thumb_id( $terms[0] );
			}
		}

		if ( ! $id ) {
			$id = get_option( 'capitola_' . $post->post_type . '_default_image' );
		}
	}

	return $id;
}

/**
 * Returns the thumbnail image ID for a term, with a post type fallback if the term has no set image.
 *
 * @param int|array|\WP_Term $tax_object Term ID, term array, or term object.
 * @return int|false
 */
function term_thumb_id( $tax_object ) {

	if ( is_numeric( $tax_object ) ) {
		$tax_object = get_term( $tax_object );
	} elseif ( is_array( $tax_object ) ) {
		$tax_object = get_term( $tax_object['id'] );
	}

	$thumb_id = get_term_meta( $tax_object->term_id, apply_filters( "capitola_{$tax_object->taxonomy}_thumb_meta_name", 'term_thumb_id' ), true );

	if ( ! $thumb_id && $tax_object->parent ) {
		return term_thumb_id( $tax_object->parent );
	}

	if ( ! $thumb_id ) {
		$post_type = apply_filters( "capitola_{$tax_object->taxonomy}_tax_post_type", 'category' === $tax_object->taxonomy ? 'post' : false );
		$post_type = get_post_type_object( $post_type );

		if ( $post_type ) {
			$thumb_id = get_option( 'capitola_' . $post_type->name . '_default_image' );
		}
	}
	return $thumb_id;
}
