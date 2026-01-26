<?php

add_filter(
	'term_link',
	function ( $termlink, $term, $taxonomy ) {

		// if term has an assigned page

		$page_id = get_term_meta( $term->term_id, 'term_page_id', true );

		if ( $page_id ) {
			return get_permalink( $page_id );
		} else {
			$tax = get_taxonomy( $taxonomy );
			if ( count( $tax->object_type ) === 1 && isset( $tax->object_type[0] ) ) {
				$page_id = get_option( 'cwps_' . $tax->object_type[0] . '_listing_page' );

				if ( $page_id ) {
						$termlink = get_permalink( $page_id ) . '?' . ( $taxonomy === 'category' ? 'categories' : $taxonomy ) . '=' . $term->term_id;
				}
			}
		}

		return $termlink;
	},
	3,
	99
);
