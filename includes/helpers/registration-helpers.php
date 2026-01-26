<?php

namespace cwps\helpers\registrations;

function post_type_labels( $singular, $plural ) {
}

function post_labels( $singular, $plural ) {
	$uc_singular = ucwords( $singular );
	$uc_plural = ucwords( $plural );
	$ucf_single = ucfirst( $singular );

	return array(
		'name' => $uc_plural,
		'singular_name' => $uc_singular,
		'add_new_item' => 'Add New ' . $uc_singular,
		'edit_item' => 'Edit ' . $uc_singular,
		'new_item' => 'New ' . $uc_singular,
		'view_item' => 'View ' . $uc_singular,
		'view_items' => 'View ' . $uc_plural,
		'search_items' => 'Search ' . $uc_plural,
		'not_found' => 'No ' . $plural . ' found',
		'not_found_in_trash' => 'No ' . $plural . ' found in Trash',
		'parent_item_colon' => 'Parent ' . $uc_singular . ':',
		'all_items' => 'All ' . $uc_plural,
		'archives' => $uc_singular . ' Archives',
		'attributes' => $uc_singular . ' Attributes',
		'insert_into_item' => 'Insert into ' . $singular,
		'uploaded_to_this_item' => 'Uploaded to this ' . $singular,
		'items_list_navigation' => $ucf_single . ' list navigation',
		'items_list' => $ucf_single . ' list',
		'item_published' => $ucf_single . ' published.',
		'item_published_privately' => $ucf_single . ' published privately.',
		'item_reverted_to_draft' => $ucf_single . ' reverted to draft.',
		'item_trashed' => $ucf_single . ' trashed.',
		'item_scheduled' => $ucf_single . ' scheduled.',
		'item_updated' => $ucf_single . ' updated.',
		'item_link' => $uc_singular . ' Link',
		'item_link_description' => 'A link to a ' . $singular,
	);
}

function default_post_type_args( $singular, $plural, $slug, $args = array() ) {

	// when using custom svgs for icons, make sure fill color is #0073aa

	return array_merge(
		array(
			'labels' => post_labels( $singular, $plural ),
			'public' => true,
			'show_in_rest' => true,
			'menu_position' => 5,
			'capability_type' => 'page',
			'supports' => array(
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'page-attributes',
				'custom-fields',
			),
			'rewrite' => array(
				'slug' => $slug,
				'with_front' => false,
			),
			'can_export' => true,
		),
		$args
	);
}

function taxonomy_labels( $singular, $plural ) {
	$uc_singular = ucwords( $singular );
	$uc_plural = ucwords( $plural );

	return array(
		'name' => $uc_plural,
		'singular_name' => $uc_singular,
		'search_items' => 'Search ' . $uc_plural,
		'popular_items' => 'Popular ' . $uc_plural,
		'all_items' => 'All ' . $uc_plural,
		'parent_item' => 'Parent ' . $uc_singular,
		'parent_item_colon' => 'Parent ' . $uc_singular . ':',
		'edit_item' => 'Edit ' . $uc_singular,
		'view_item' => 'View ' . $uc_singular,
		'update_item' => 'Update ' . $uc_singular,
		'add_new_item' => 'Add New ' . $uc_singular,
		'new_item_name' => 'New ' . $uc_singular . ' Name',
		'separate_items_with_commas' => 'Separate ' . $plural . ' with commas',
		'add_or_remove_items' => 'Add or remove ' . $plural,
		'choose_from_most_used' => 'Choose from the most used ' . $plural,
		'not_found' => 'No ' . $plural . ' found',
		'no_terms' => 'No ' . $plural,
		'filter_by_item' => 'Filter by ' . $singular,
		'back_to_items' => 'Back to ' . $plural,
		'item_link' => $uc_singular . ' Link',
		'item_link_description' => 'A link to a ' . $uc_singular,
	);
}

function filter_taxonomy_args( $singular, $plural ) {

	return array(
		'labels' => taxonomy_labels( $singular, $plural ),
		'public' => false, // disables archive pages, hides from site map
		'show_ui' => true, // allows editors to add and edit terms
		'show_in_menu' => true, // adds the taxonopmy to the related post type admin menu
		'show_in_rest'  => true,
		'show_admin_column' => true, // adds taxonomy to the post type admin list table
		'hierarchical' => true, // allows parent/child relationships, with checkbox selection
		'query_var' => false,
		'rewrite' => false,
	);
}
