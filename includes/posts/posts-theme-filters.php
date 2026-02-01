<?php

namespace Capitola\Post_Types\Posts\Theme_Filters;

add_filter( 'cwps_related_post_query', __NAMESPACE__ . '\related_posts_query_args', 5 );

function related_posts_query_args( $args ) {
	$args['orderby'] = 'date';
	$args['order'] = 'desc';
	return $args;
}

add_filter( 'cwps_related_post_query_tax', __NAMESPACE__ . '\related_posts_query_tax', 5 );

function related_posts_query_tax() {
	return 'category';
}

add_filter(
	'cwps_post_base_taxonomy',
	function () {
		return 'category';
	}
);

add_filter(
	'cwps_post_cta_label',
	function () {
		return 'View Article';
	}
);
