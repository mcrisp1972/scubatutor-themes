<?php

namespace Capitola\Post_Types\Pages\Rest_Api;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Extends the REST API for pages.
 *
 * @return void
 */
function extend_rest_endpoint() {

	register_rest_field(
		array( 'page' ),
		'cta_label',
		array(
			'get_callback' => function () {
				return apply_filters( 'capitola_page_cta_label', '' );
			},
		)
	);
}

add_action( 'rest_api_init', __NAMESPACE__ . '\extend_rest_endpoint' );
