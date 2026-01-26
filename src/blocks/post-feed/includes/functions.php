<?php

namespace cwps\postFeed;

function query_post_listings( $attributes ) {

	$order_bys = array(
		'title' => 'ASC',
		'menu_order' => 'DESC',
		'event_date' => 'ASC',
		'date' => 'DESC',
		'ID' => 'DESC',
	);

	$args = array(
		'post_type' => $attributes['postType'],
		'posts_per_page' => $attributes['limit'],
		'orderby' => $attributes['orderBy'],
		'order' => $order_bys[ $attributes['orderBy'] ],
	);

	$args = apply_filters( "cwps_{$attributes['postType']}_listings_query_args", $args, $attributes );

	if ( ! empty( $attributes['postCategory'] ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => apply_filters( "cwps_related_{$attributes['postType']}_query_tax", false ),
				'field' => 'term_id',
				'terms' => $attributes['postCategory'],
				'compare' => 'IN',
			),
		);
	}

	return new \WP_Query( $args );
}
