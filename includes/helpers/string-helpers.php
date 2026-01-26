<?php

namespace cwps\helpers\stringHelpers;

function phone_link_number( $phone_number ) {
	return preg_replace( '/[^0-9]/', '', $phone_number );
}

function date_time_range( $start, $end, $all_day = false ) {
	$current_year = date( 'Y', time() );
	$start_timestamp = strtotime( $start );
	$end_timestamp = $end ? strtotime( $end ) : $start_timestamp;
	$start_date = substr( $start, 0, 10 );
	$end_date = $end ? substr( $end, 0, 10 ) : $start_date;
	$start_time = substr( $start, -8 );
	$end_time = $end ? substr( $end, -8 ) : $start_time;
	$start_year = date( 'Y', $start_timestamp );
	$end_year = $end ? date( 'Y', $end_timestamp ) : $start_year;
	$start_month = date( 'M', $start_timestamp );
	$end_month = $end ? date( 'M', $end_timestamp ) : $start_month;
	$start_day = date( 'j', $start_timestamp );
	$end_day = $end ? date( 'j', $end_timestamp ) : $start_day;
	$start_minute = date( 'i', $start_timestamp );
	$end_minute = $end ? date( 'i', $end_timestamp ) : $start_minute;
	$start_meridiem = date( 'a', $start_timestamp );
	$end_meridiem = $end ? date( 'a', $end_timestamp ) : $start_meridiem;

	// start and end are the same, or no end date, or dates are the same and it's all day
	if ( ! $end || $end === $start || ( $start_date === $end_date && $all_day ) ) {
		$string = $start_month . ' ' . $start_day;
		if ( $current_year !== $end_year ) {
			$string .= ' ' . $end_year;
		}
		if ( ! $all_day ) {
			$string .= date( ', g' . ( $start_minute !== '00' ? ':i' : '' ) . 'a', $start_timestamp );
		}
		return $string;
	} elseif ( $start_date === $end_date ) {
		$string = $start_month . ' ' . $start_day;
		if ( $current_year !== $end_year ) {
			$string .= ' ' . $end_year;
		}
		if ( ! $all_day ) {
			$start_time_format = 'g' . ( $start_minute !== '00' ? ':i' : '' ) . ( $start_meridiem !== $end_meridiem ? 'a' : '' );
			$end_time_format = 'g' . ( $start_minute !== '00' ? ':i' : '' ) . 'a';
			$string .= ', ' . date( $start_time_format, $start_timestamp ) . '-' . date( $end_time_format, $end_timestamp );
		}
		return $string;
	} else {
		$string = $start_month . ' ' . $start_day;
		if ( $current_year !== $start_year ) {
			$string .= ' ' . $start_year;
		}
		if ( ! $all_day ) {
			$start_time_format = ', g' . ( $start_minute !== '00' ? ':i' : '' ) . 'a';
			$string .= date( $start_time_format, $start_timestamp );
		}
		$string .= ' - ' . $end_month . ' ' . $end_day;
		if ( ! $all_day ) {
			$end_time_format = ', g' . ( $end_minute !== '00' ? ':i' : '' ) . 'a';
			$string .= date( $end_time_format, $end_timestamp );
		}
		return $string;
	}
}

// returns the target attribute for block attributes storing link data
function link_target( $link_object ) {
	if ( ! empty( $link_object['target'] ) || ! empty( $link_object['opensInNewTab'] ) ) {
		return ' target="_blank" ';
	}
	return '';
}

// returns the href attribute for block attributes storing link data
function link_href( $link_object ) {
	if ( ! empty( $link_object['url'] ) ) {
		if ( ! empty( $link_object['id'] ) ) {
			return get_the_permalink( $link_object['id'] );
		}
		return esc_url( $link_object['url'] );
	}
	return '';
}

// returns the href and target attributes for block attributes storing link data
function link_attributes( $link_object ) {
	$url = link_href( $link_object );
	if ( $url ) {
		return ' href="' . $url . '"' . link_target( $link_object );
	}
	return '';
}

function render_link( $attribute, $classname ) {
	$text = ! empty( $attribute['title'] ) ? $attribute['title'] : ( ! empty( $attribute['link']['title'] ) ? $attribute['link']['title'] : '' );
	$link_array = ! empty( $attribute['link'] ) ? $attribute['link'] : $attribute;
	$link_attributes = link_attributes( $link_array );

	if ( $link_attributes && $text ) {
		return '<a' . ( $classname ? ' class="' . $classname . '" ' : '' ) . $link_attributes . '>' . esc_html( $text ) . '</a>';
	}
	return '';
}

function page_parent_label( $post_id ) {
	$post_type = get_post_type( $post_id );
	if ( $post_type === 'page' ) {
		$parent_id = wp_get_post_parent_id( $post_id );
		if ( $parent_id ) {
			return get_the_title( $parent_id );
		}
	} elseif ( $post_type !== 'post' ) {
		$featured_link_type_obj = get_post_type_object( $post_type );
		return $featured_link_type_obj->labels->name;
	}
	return '';
}

function get_post_term_name( $post ) {
	$post_type = get_post_type( $post );

	$taxonomy = apply_filters( "cwps_{$post_type}_base_taxonomy", false );

	if ( ! $taxonomy ) {
		return false;
	} else {
		$terms = get_the_terms( $post, $taxonomy );
		if ( isset( $terms[0] ) ) {
			return $terms[0]->name;
		} else {
			return false;
		}
	}
	return '';
}
