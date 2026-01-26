<?php

add_filter(
	'cwps_page_fallback_image_id',
	function ( $image_id, $post ) {
		if ( $post->post_parent ) {
			return get_post_thumbnail_id( $post->post_parent );
		}
		return $image_id;
	},
	5,
	2
);

add_filter(
	'cwps_page_cta_label',
	function () {
		return 'View Page';
	}
);
