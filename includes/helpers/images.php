<?php

namespace Capitola\Helpers\Images;

function post_image_id( $post ) {

	if ( gettype( $post ) !== 'object' ) {
		$post = get_post( $post );
	}

	$id = apply_filters( "capitola_{$post->post_type}_fallback_image_id", false, $post );

	if ( ! $id ) {
		$taxonomy = apply_filters( "capitola_{$post->post_type}_base_taxonomy", $post->post_type === 'post' ? 'category' : false );

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

function term_thumb_id( $object ) {

	if ( is_numeric( $object ) ) {
		$object = get_term( $object );
	} elseif ( is_array( $object ) ) {
		$object = get_term( $object['id'] );
	}

	$thumb_id = get_term_meta( $object->term_id, apply_filters( "capitola_{$object->taxonomy}_thumb_meta_name", 'term_thumb_id' ), true );

	if ( ! $thumb_id && $object->parent ) {
		return term_thumb_id( $object->parent );
	}

	if ( ! $thumb_id ) {
		$post_type = apply_filters( "capitola_{$object->taxonomy}_tax_post_type", $object->taxonomy === 'category' ? 'post' : false );
		$post_type = get_post_type_object( $post_type );

		if ( $post_type ) {
			$thumb_id = get_option( 'capitola_' . $post_type->name . '_default_image' );
		}
	}
	return $thumb_id;
}
