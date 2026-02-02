<?php

namespace Capitola\Supports\Comments;

function show_if_comments_enabled( $post_id ) {
	$allowed_post_types = apply_filters( 'capitola_comments_allowed_post_types', array() );
	$post_type = get_post_type( $post_id );
	if ( in_array( $post_type, $allowed_post_types, true ) && post_type_supports( $post_type, 'comments' ) ) {
		return true;
	}
	return false;
}

function admin_disable_comments() {
	// Redirect any user trying to access comments page.
	global $pagenow;
	$allowed_post_types = apply_filters( 'capitola_comments_allowed_post_types', array() );

	if ( 'edit-comments.php' === $pagenow ) {
		wp_safe_redirect( admin_url() );
		exit;
	}

	// Remove comments metabox from dashboard.
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );

	// Disable support for comments and trackbacks in post types.
	foreach ( get_post_types() as $post_type ) {
		if ( ! in_array( $post_type, $allowed_post_types, true ) && post_type_supports( $post_type, 'comments' ) ) {
			remove_post_type_support( $post_type, 'comments' );
			remove_post_type_support( $post_type, 'trackbacks' );
		}
	}
}

add_action( 'admin_init', __NAMESPACE__ . '\admin_disable_comments' );

// Remove comments page in menu.
add_action(
	'admin_menu',
	function () {
		remove_menu_page( 'edit-comments.php' );
	}
);

// Remove comments links from admin bar.
add_action( 'wp_before_admin_bar_render', __NAMESPACE__ . '\remove_comments' );

function remove_comments() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu( 'comments' );
}

// Close comments on the front-end.
add_filter(
	'comments_open',
	function ( $open, $post_id ) {
		return show_if_comments_enabled( $post_id );
	},
	20,
	2
);

add_filter( 'pings_open', '__return_false', 20, 2 );

// Hide existing comments.
add_filter(
	'comments_array',
	function ( $comments_flat, $post_id ) {
		if ( ! show_if_comments_enabled( $post_id ) ) {
			return array();
		}
		return $comments_flat;
	},
	10,
	2
);
