<?php

namespace Capitola\Post_Types\Pages\Theme_Filters;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Provides a fallback image ID for pages.
 *
 * @param int|false $image_id Image ID.
 * @param \WP_Post  $post     Post object.
 * @return int|false
 */
function fallback_image_id( $image_id, $post ) {
	if ( $post->post_parent ) {
		return get_post_thumbnail_id( $post->post_parent );
	}
	return $image_id;
}

add_filter( 'capitola_page_fallback_image_id', __NAMESPACE__ . '\fallback_image_id', 10, 2 );

/**
 * Returns the CTA label for pages.
 *
 * @return string
 */
function cta_label() {
	return 'View Page';
}

add_filter( 'capitola_page_cta_label', __NAMESPACE__ . '\cta_label' );
