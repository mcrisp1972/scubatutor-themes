<?php

namespace Capitola\Admin_Terms_Listings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds the thumbnail column header for term listings.
 *
 * @param array $columns Existing columns.
 * @return array
 */
function tax_thumb_col_head( $columns ) {
	$new_columns = array();
	if ( isset( $columns['cb'] ) ) {
		$new_columns['cb'] = $columns['cb'];
		unset( $columns['cb'] );
	}
	$new_columns['capitola-tax-img'] = 'Thumb';
	return array_merge( $new_columns, $columns );
}

/**
 * Renders the thumbnail column content for terms.
 *
 * @param string $c           Column output.
 * @param string $column_name Column name.
 * @param int    $term_id     Term ID.
 * @return string
 */
function tax_thumb_col( $c, $column_name, $term_id ) {
	if ( 'capitola-tax-img' === $column_name ) {
		$image_id = get_term_meta( $term_id, 'term_thumb_id', true );
		$image    = wp_get_attachment_image( $image_id, array( '40', '40' ) );
		return ( $image ) ? $image : '';
	}
	return $c;
}
