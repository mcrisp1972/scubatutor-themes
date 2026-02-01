<?php

namespace Capitola\Images;

add_action( 'after_setup_theme', __NAMESPACE__ . '\image_sizes' );

function image_sizes() {
	add_image_size( 'small', 300 );
	add_image_size( 'med-thumb', 300, 300, true );
}

add_filter( 'post_thumbnail_id', __NAMESPACE__ . '\thumbnail_id', 2, 99 );

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

// eager load only the first image
add_filter(
	'wp_omit_loading_attr_threshold',
	function () {
		return 2;
	}
);
