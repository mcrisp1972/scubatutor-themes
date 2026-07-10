<?php

namespace Capitola\Blocks\Stats_Item;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Splits a stat value into prefix, number, and suffix parts.
 *
 * @param string $stat_value The stat value to split.
 * @return string Rendered HTML for the stat value.
 */
function get_stat_parts( $stat_value ) {
	if ( preg_match( '/^(.*?)([\d,]*\.?\d+)(.*)$/s', $stat_value, $matches ) ) {
		$parts['prefix'] = $matches[1];
		$parts['number'] = $matches[2];
		$parts['suffix'] = $matches[3];
	}
	if ( ! empty( $parts['number'] ) ) {
		return $parts['prefix'] . '<span class="stat-counter__number stat-counter" data-target="' . esc_attr( str_replace( ',', '', $parts['number'] ) ) . '" data-original="' . esc_attr( $parts['number'] ) . '">0</span>' . $parts['suffix'];
	} else {
		return $stat_value;
	}
}
