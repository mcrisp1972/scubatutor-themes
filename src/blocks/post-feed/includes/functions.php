<?php

namespace Capitola\Blocks\Post_Feed;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Builds the post feed query.
 *
 * @param array $attributes Block attributes.
 * @return \WP_Query
 */
function query_post_listings( $attributes ) {

	$order_bys = array(
		'title'      => 'ASC',
		'menu_order' => 'ASC',
		'event_date' => 'ASC',
		'date'       => 'DESC',
		'ID'         => 'DESC',
	);

	$args = array(
		'post_type'      => $attributes['postType'],
		'posts_per_page' => $attributes['limit'],
		'orderby'        => $attributes['orderBy'],
		'order'          => $order_bys[ $attributes['orderBy'] ],
	);

	$args = apply_filters( "capitola_{$attributes['postType']}_listings_query_args", $args, $attributes );

	if ( ! empty( $attributes['postCategory'] ) ) {
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		$args['tax_query'] = array(
			array(
				'taxonomy' => apply_filters( "capitola_related_{$attributes['postType']}_query_tax", false ),
				'field'    => 'term_id',
				'terms'    => $attributes['postCategory'],
				'compare'  => 'IN',
			),
		);
	}

	return new \WP_Query( $args );
}
