<?php

namespace Capitola\Template_Hooks;

add_filter( 'body_class', __NAMESPACE__ . '\add_body_theme_class', 1, 99 );

function add_body_theme_class( $classes ) {

	$object = get_queried_object();

	if ( is_object( $object ) && get_class( $object ) == 'WP_Post' ) {
		$use_default = get_post_meta( $object->ID, 'useDefColorTheme', true );
		$default_theme = get_option( 'capitola_default_page_color_theme' );
		$page_theme = get_post_meta( $object->ID, 'pageColorTheme', true );
		$applied = $use_default || ! $page_theme ? $default_theme : $page_theme;
		$classes[] = '--theme-' . $applied;
	}

	return $classes;
}
