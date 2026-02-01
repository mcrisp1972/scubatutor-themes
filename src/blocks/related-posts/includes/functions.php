<?php

namespace Capitola\Blocks\Related_Posts;

function query_related_posts( $attributes ) {

	$post = get_queried_object();

	if ( $post ) {

		if ( $post->post_type === 'page' ) {
			$args = array(
				'post_type' => 'page',
				'posts_per_page' => $attributes['limit'],
				'post__not_in' => array( $post ? $post->ID : 1 ),
				'post_parent__in' => $post->post_parent ? array( $post->post_parent ) : array( $post->ID ),
				'orderby' => 'menu_order',
				'order' => 'DESC',
			);
		} else {

			$args = array(
				'post_type' => $post ? $post->post_type : 'post',
				'posts_per_page' => $attributes['limit'],
				'post__not_in' => array( $post ? $post->ID : 1 ),
			);

			if ( $post ) {

				$args = apply_filters( "capitola_related_{$post->post_type}_query", $args, $post );
				$tax = apply_filters( "capitola_related_{$post->post_type}_query_tax", false );
			}

			if ( ! empty( $tax ) ) {
				$terms = get_the_terms( $post, $tax );
				$term_ids = wp_list_pluck( $terms, 'term_id' );
				if ( $term_ids ) {
					$args['tax_query'] = array(
						array(
							'taxonomy' => $tax,
							'field' => 'term_id',
							'terms' => $term_ids,
						),
					);
				}
			}
		}

		return new \WP_Query( $args );
	}
}
