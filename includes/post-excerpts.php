<?php

namespace Capitola\Filters\Post_Excerpts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_post_type_support( 'page', 'excerpt' );

/**
 * Strips HTML tags from excerpts.
 *
 * @param string $excerpt Excerpt text.
 * @return string
 */
function remove_html_from_excerpt( $excerpt ) {
	return wp_strip_all_tags( $excerpt );
}

add_filter( 'the_excerpt', __NAMESPACE__ . '\remove_html_from_excerpt', 20 );

/**
 * Sets the excerpt length.
 *
 * @return int
 */
function excerpt_length() {
	return 55;
}

add_filter( 'excerpt_length', __NAMESPACE__ . '\excerpt_length', 20 );

/**
 * Sets the excerpt more string.
 *
 * @return string
 */
function excerpt_more() {
	return '&hellip;';
}

add_filter( 'excerpt_more', __NAMESPACE__ . '\excerpt_more', 20 );
