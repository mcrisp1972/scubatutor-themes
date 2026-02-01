<?php

namespace Capitola\Hooks\Google_Analytics;

function head_script() {
	$ga_script = get_option( 'capitola_google' );
	if ( is_array( $ga_script ) && ! empty( $ga_script['head'] ) ) {
		$allowed = array(
			'script'  => array(
				'src'   => true,
				'async' => true,
				'defer' => true,
				'type'  => true,
				'id'    => true,
			),
			'noscript' => array(),
		);
		echo wp_kses( $ga_script['head'], $allowed );
	}
}

add_action( 'wp_head', __NAMESPACE__ . '\head_script', 1 );

function after_body_open_tag() {
	$ga_script = get_option( 'capitola_google' );
	if ( is_array( $ga_script ) && ! empty( $ga_script['body'] ) ) {
		$allowed = array(
			'script'  => array(
				'src'   => true,
				'async' => true,
				'defer' => true,
				'type'  => true,
				'id'    => true,
			),
			'iframe' => array(
				'src'    => true,
				'height' => true,
				'width'  => true,
				'style'  => true,
				'id'     => true,
				'title'  => true,
			),
			'noscript' => array(),
		);
		echo wp_kses( $ga_script['body'], $allowed );
	}
}

add_action( 'wp_body_open', __NAMESPACE__ . '\after_body_open_tag', 1 );
