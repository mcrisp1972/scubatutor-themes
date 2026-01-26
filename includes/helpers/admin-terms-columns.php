<?php

namespace cwps\AdminTermsListings;

function tax_thumb_col_head( $columns ) {
	$new_columns = array();
	if ( isset( $columns['cb'] ) ) {
		$new_columns['cb'] = $columns['cb'];
		unset( $columns['cb'] );
	}
	$new_columns['cwps-tax-img'] = 'Thumb';
	return array_merge( $new_columns, $columns );
}

function tax_thumb_col( $c, $column_name, $term_id ) {
	switch ( $column_name ) {
		case 'cwps-tax-img':
			$image_id = get_term_meta( $term_id, 'term_thumb_id', true );
			$image = wp_get_attachment_image( $image_id, array( '40', '40' ) );
			return ( $image ) ? $image : '';
			break;
	}
}
