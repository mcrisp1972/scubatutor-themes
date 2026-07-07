<?php

namespace Capitola\Helpers\String_Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Normalizes a phone number for tel links.
 *
 * @param string $phone_number Raw phone number.
 * @return string
 */
function phone_link_number( $phone_number ) {
	return preg_replace( '/[^0-9]/', '', $phone_number );
}

/**
 * Builds a human-friendly date/time range string.
 *
 * @param string      $start   Start date/time string.
 * @param string|null $end     End date/time string.
 * @param bool        $all_day Whether the event is all-day.
 * @return string
 */
function date_time_range( $start, $end, $all_day = false ) {
	$current_year    = gmdate( 'Y', time() );
	$start_timestamp = strtotime( $start );
	$end_timestamp   = $end ? strtotime( $end ) : $start_timestamp;
	$start_date      = substr( $start, 0, 10 );
	$end_date        = $end ? substr( $end, 0, 10 ) : $start_date;
	$start_time      = substr( $start, -8 );
	$end_time        = $end ? substr( $end, -8 ) : $start_time;
	$start_year      = gmdate( 'Y', $start_timestamp );
	$end_year        = $end ? gmdate( 'Y', $end_timestamp ) : $start_year;
	$start_month     = gmdate( 'M', $start_timestamp );
	$end_month       = $end ? gmdate( 'M', $end_timestamp ) : $start_month;
	$start_day       = gmdate( 'jS', $start_timestamp );
	$end_day         = $end ? gmdate( 'jS', $end_timestamp ) : $start_day;
	$start_minute    = gmdate( 'i', $start_timestamp );
	$end_minute      = $end ? gmdate( 'i', $end_timestamp ) : $start_minute;
	$start_meridiem  = gmdate( 'a', $start_timestamp );
	$end_meridiem    = $end ? gmdate( 'a', $end_timestamp ) : $start_meridiem;

	// start and end are the same, or no end date, or dates are the same and it's all day.
	if ( ! $end || $end === $start || ( $start_date === $end_date && $all_day ) ) {
		$string = $start_month . ' ' . $start_day;
		if ( $current_year !== $end_year ) {
			$string .= ' ' . $end_year;
		}
		if ( ! $all_day ) {
			$string .= gmdate( ', g' . ( '00' !== $start_minute ? ':i' : '' ) . 'a', $start_timestamp );
		}
		return $string;
	} elseif ( $start_date === $end_date ) {
		$string = $start_month . ' ' . $start_day;
		if ( $current_year !== $end_year ) {
			$string .= ' ' . $end_year;
		}
		if ( ! $all_day ) {
			$start_time_format = 'g' . ( '00' !== $start_minute ? ':i' : '' ) . ( $start_meridiem !== $end_meridiem ? 'a' : '' );
			$end_time_format   = 'g' . ( '00' !== $start_minute ? ':i' : '' ) . 'a';
			$string           .= ', ' . gmdate( $start_time_format, $start_timestamp ) . '-' . gmdate( $end_time_format, $end_timestamp );
		}
		return $string;
	} else {
		$string = $start_month . ' ' . $start_day;

		if ( ! $all_day ) {
			$start_time_format = ', g' . ( '00' !== $start_minute ? ':i' : '' ) . 'a';
			$string           .= gmdate( $start_time_format, $start_timestamp );
		}
		$string .= ' - ' . $end_month . ' ' . $end_day;
		if ( ! $all_day ) {
			$end_time_format = ', g' . ( '00' !== $end_minute ? ':i' : '' ) . 'a';
			$string         .= gmdate( $end_time_format, $end_timestamp );
		}
		if ( $current_year !== $end_year ) {
			$string .= ' ' . $end_year;
		}
		return $string;
	}
}

/**
 * Returns the target attribute for block attributes storing link data.
 *
 * @param array $link_object Link data array.
 * @return string
 */
function link_target( $link_object ) {
	if ( ! empty( $link_object['target'] ) || ! empty( $link_object['opensInNewTab'] ) ) {
		return ' target="_blank" ';
	}
	return '';
}

/**
 * Returns the href attribute for block attributes storing link data.
 *
 * @param array $link_object Link data array.
 * @return string
 */
function link_href( $link_object ) {
	if ( ! empty( $link_object['url'] ) ) {
		if ( ! empty( $link_object['id'] ) ) {
			return get_the_permalink( $link_object['id'] );
		}
		return esc_url( $link_object['url'] );
	}
	return '';
}

/**
 * Returns the href and target attributes for block attributes storing link data.
 *
 * @param array $link_object Link data array.
 * @return string
 */
function link_attributes( $link_object ) {
	$url = link_href( $link_object );
	if ( $url ) {
		return ' href="' . $url . '"' . link_target( $link_object );
	}
	return '';
}

/**
 * Renders an anchor tag from block link attributes.
 *
 * @param array  $attribute Link attribute data.
 * @param string $classname Optional class name.
 * @return string
 */
function render_link( $attribute, $classname ) {
	$text            = ! empty( $attribute['title'] ) ? $attribute['title'] : ( ! empty( $attribute['link']['title'] ) ? $attribute['link']['title'] : '' );
	$link_array      = ! empty( $attribute['link'] ) ? $attribute['link'] : $attribute;
	$link_attributes = link_attributes( $link_array );

	if ( $link_attributes && $text ) {
		return '<a' . ( $classname ? ' class="' . $classname . '" ' : '' ) . $link_attributes . '>' . esc_html( $text ) . '</a>';
	}
	return '';
}

/**
 * Returns the label for a page parent or post type archive.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function page_parent_label( $post_id ) {
	$post_type = get_post_type( $post_id );
	if ( 'page' === $post_type ) {
		$parent_id = wp_get_post_parent_id( $post_id );
		if ( $parent_id ) {
			return get_the_title( $parent_id );
		}
	} elseif ( 'post' !== $post_type ) {
		$featured_link_type_obj = get_post_type_object( $post_type );
		return $featured_link_type_obj->labels->name;
	}
	return '';
}

/**
 * Returns the first term name for the post's base taxonomy.
 *
 * @param int|\WP_Post $post Post ID or object.
 * @return string|false
 */
function get_post_term_name( $post ) {
	$post_type = get_post_type( $post );

	$taxonomy = apply_filters( "capitola_{$post_type}_base_taxonomy", false );

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
