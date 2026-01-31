<?php

namespace Cwps\Hooks\Google_Analytics;

function head_script() {
	$ga_script = get_option( 'cwps_google' );
	if ( $ga_script['head'] ) {
		echo $ga_script['head'];
	}
}

add_action( 'wp_head', __NAMESPACE__ . '\head_script', 1 );

function after_body_open_tag() {
	$ga_script = get_option( 'cwps_google' );
	if ( $ga_script['body'] ) {
		echo $ga_script['body'];
	}
}

add_action( 'wp_body_open', __NAMESPACE__ . '\after_body_open_tag', 1 );
