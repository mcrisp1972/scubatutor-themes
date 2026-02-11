<?php

namespace Capitola\Images;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers custom image sizes.
 *
 * @return void
 */
function image_sizes() {
	add_image_size( 'small', 300 );
	add_image_size( 'med-thumb', 300, 300, true );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\image_sizes' );

/**
 * Filters the post thumbnail ID with fallbacks.
 *
 * @param int|false    $thumbnail_id Thumbnail ID.
 * @param int|\WP_Post $post         Post ID or object.
 * @return int|false
 */
function thumbnail_id( $thumbnail_id, $post ) {

	if ( $thumbnail_id ) {
		return $thumbnail_id;
	}

	if ( gettype( $post ) !== 'object' ) {
		$post = get_post( $post );
	}

	if ( ! in_array( $post->post_type, apply_filters( 'capitola_filtered_feat_img_post_types', array( 'page', 'post' ) ), true ) ) {
		return $thumbnail_id;
	}

	if ( ! $thumbnail_id ) {
		return \Capitola\Helpers\Images\post_image_id( $post );
	}
}

add_filter( 'post_thumbnail_id', __NAMESPACE__ . '\thumbnail_id', 10, 2 );

// eager load only the first 2 images.
add_filter(
	'wp_omit_loading_attr_threshold',
	function () {
		return 2;
	}
);
