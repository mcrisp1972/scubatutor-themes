<?php

namespace Capitola\Filters\Post_Excerpts;

add_post_type_support( 'page', 'excerpt' );

add_filter( 'the_excerpt', __NAMESPACE__ . '\remove_html_from_excerpt', 99 );

function remove_html_from_excerpt( $excerpt ) {
	return wp_strip_all_tags( $excerpt );
}

add_filter( 'excerpt_length', __NAMESPACE__ . '\excerpt_length', 99 );

function excerpt_length() {
	return 55;
}

add_filter( 'excerpt_more', __NAMESPACE__ . '\excerpt_more', 99 );

function excerpt_more() {
	return '&hellip;';
}
