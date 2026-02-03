<?php

namespace Capitola\Term_links;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Overrides term links to point at term pages or listing pages.
 *
 * @param string  $termlink Term link.
 * @param WP_Term $term     Term object.
 * @param string  $taxonomy Taxonomy name.
 * @return string
 */
function term_link_override( $termlink, $term, $taxonomy ) {
	$page_id = get_term_meta( $term->term_id, 'term_page_id', true );

	if ( $page_id ) {
		return get_permalink( $page_id );
	}

	$tax = get_taxonomy( $taxonomy );
	if ( $tax && count( $tax->object_type ) === 1 && isset( $tax->object_type[0] ) ) {
		$page_id = get_option( 'capitola_' . $tax->object_type[0] . '_listing_page' );

		if ( $page_id ) {
			$termlink = get_permalink( $page_id ) . '?' . ( 'category' === $taxonomy ? 'categories' : $taxonomy ) . '=' . $term->term_id;
		}
	}

	return $termlink;
}

add_filter( 'term_link', __NAMESPACE__ . '\term_link_override', 10, 3 );
