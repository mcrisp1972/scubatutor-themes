<?php

namespace Capitola\Post_Types\Pages\Rest_Api;

add_action( 'rest_api_init', __NAMESPACE__ . '\extend_rest_endpoint' );

function extend_rest_endpoint() {

	register_rest_field(
		array( 'page' ),
		'cta_label',
		array(
			'get_callback' => function ( $post ) {
				return apply_filters( 'capitola_page_cta_label', '' );
			},
		)
	);
}
