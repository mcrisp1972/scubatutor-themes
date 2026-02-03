<?php

namespace Capitola\Post_Types\Posts\Theme_Filters;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adjusts query arguments for related posts.
 *
 * @param array $args Query arguments.
 * @return array
 */
function related_posts_query_args( $args ) {
	$args['orderby'] = 'date';
	$args['order']   = 'desc';
	return $args;
}

add_filter( 'capitola_related_post_query', __NAMESPACE__ . '\related_posts_query_args' );

/**
 * Returns the taxonomy used for related posts.
 *
 * @return string
 */
function related_posts_query_tax() {
	return 'category';
}

add_filter( 'capitola_related_post_query_tax', __NAMESPACE__ . '\related_posts_query_tax' );

add_filter(
	'capitola_post_base_taxonomy',
	function () {
		return 'category';
	}
);

add_filter(
	'capitola_post_cta_label',
	function () {
		return 'View Article';
	}
);
