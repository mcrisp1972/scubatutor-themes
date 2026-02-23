<?php

namespace Capitola\Blocks\Related_Posts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Builds the related posts query.
 *
 * @param array $attributes Block attributes.
 * @return \WP_Query|null
 */
function query_related_posts( $attributes ) {

	$post = get_queried_object();

	if ( $post ) {

		if ( 'page' === $post->post_type ) {
			$args = array(
				'post_type'       => 'page',
				'posts_per_page'  => $attributes['limit'],
				'post__not_in'    => array( $post ? $post->ID : 1 ),
				'post_parent__in' => $post->post_parent ? array( $post->post_parent ) : array( $post->ID ),
				'orderby'         => 'menu_order',
				'order'           => 'ASC',
			);
		} else {

			$args = array(
				'post_type'      => $post ? $post->post_type : 'post',
				'posts_per_page' => $attributes['limit'],
				'post__not_in'   => array( $post ? $post->ID : 1 ),
			);

			if ( $post ) {

				$args = apply_filters( "capitola_related_{$post->post_type}_query", $args, $post );
				$tax  = apply_filters( "capitola_related_{$post->post_type}_query_tax", false );
			}

			if ( ! empty( $tax ) ) {
				$terms    = get_the_terms( $post, $tax );
				$term_ids = wp_list_pluck( $terms, 'term_id' );
				if ( $term_ids ) {
					// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					$args['tax_query'] = array(
						array(
							'taxonomy' => $tax,
							'field'    => 'term_id',
							'terms'    => $term_ids,
						),
					);
				}
			}
		}

		return new \WP_Query( $args );
	}
}
