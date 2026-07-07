<?php

namespace Capitola\Helpers\Block_Attributes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Normalizes block attribute keys by removing known namespace prefixes.
 *
 * @param array $attributes Block attributes.
 * @return array
 */
function normalize_attribute_keys( $attributes ) {
	if ( ! is_array( $attributes ) ) {
		return $attributes;
	}

	$normalized = array();

	foreach ( $attributes as $key => $value ) {
		if ( is_string( $key ) && 0 === strpos( $key, 'capitola/' ) ) {
			$key = substr( $key, strlen( 'capitola/' ) );
		}
		$normalized[ $key ] = $value;
	}

	return $normalized;
}

/**
 * Returns CSS class names for scroll animated images.
 *
 * @param string $attribute Scroll animation.
 * @return string
 */
function img_scroll_animation_class( $attribute ) {
	if ( 'parallax' === $attribute ) {
		return '--img-parallax js-imgParallax';
	} elseif ( 'zoom' === $attribute ) {
		return 'js-imgZoom';
	}
	return '';
}

/**
 * Builds block animation classes and data attributes.
 *
 * @param array $attributes Block attributes.
 * @param bool  $force_body Force animation on body section.
 * @return array
 */
function animation_attributes( $attributes, $force_body = false ) {
	$attributes = normalize_attribute_keys( $attributes );

	if ( ! isset( $attributes['revealAnimation'] ) ) {
		return array(
			'block-class'   => '',
			'body-class'    => '',
			'figure-class'  => '',
			'block-styles'  => '',
			'body-styles'   => '',
			'figure-styles' => '',
		);
	}

	$animation = array_merge(
		array(
			'animation'     => '',
			'direction'     => '',
			'duration'      => '',
			'unit'          => 'px',
			'section'       => '',
			'startPosition' => 0,
			'origin'        => '',
			'easing'        => 'linear',
		),
		is_array( $attributes['revealAnimation'] ) ? $attributes['revealAnimation'] : array()
	);

	// Adjust start position for horizontal animations based on intro alignment and animation origin.
	if ( ( 'body' === $animation['section'] || 'figure' === $animation['section'] ) && 'horizontal' === $animation['direction'] && 'top' !== $attributes['introAlign'] ) {
		if ( 'body' === $animation['section'] && 'left' === $attributes['introAlign'] ) {
			$animation['origin'] = 'left';
		} elseif ( 'figure' === $animation['section'] && 'right' === $attributes['introAlign'] ) {
			$animation['origin'] = 'left';
		}
	}

	if ( 'left' === $animation['origin'] ) {
		$animation['startPosition'] = '-' . $animation['startPosition'];
	}

	$gsap_styles = array(
		'fadeIn'     => '--reveal-x-position: 0; --reveal-y-position: 0; --reveal-duration: ' . $animation['duration'] . 's; --reveal-easing: ' . $animation['easing'] . ';',

		'fadeUp'     => '--reveal-x-position: 0; --reveal-y-position: ' . $animation['startPosition'] . '; --reveal-duration: ' . $animation['duration'] . 's; --reveal-easing: ' . $animation['easing'] . ';',

		'sideReveal' => '--reveal-x-position: ' . $animation['startPosition'] . '; --reveal-y-position: 0; --reveal-duration: ' . $animation['duration'] . 's; --reveal-easing: ' . $animation['easing'] . ';',

		'sideShift'  => '--reveal-x-position: ' . $animation['startPosition'] . '; --reveal-y-position: 0; --reveal-duration: ' . $animation['duration'] . 's; --reveal-easing: ' . $animation['easing'] . ';',
	);

	$class = '';
	$array = array(
		'block-class'   => '',
		'body-class'    => '',
		'figure-class'  => '',
		'block-styles'  => '',
		'body-styles'   => '',
		'figure-styles' => '',
	);

	$block_animation         = ! empty( $animation['animation'] ) ? $animation['animation'] : '';
	$block_animation_section = ! empty( $animation['section'] ) ? $animation['section'] : '';
	$intro_align             = ! empty( $attributes['introAlign'] ) ? $attributes['introAlign'] : 'top';

	if ( ! empty( $block_animation ) ) {
		$class = ' js-revealAnimation --has-reveal-animation';

		if ( $block_animation_section ) {

			if ( 'block' === $block_animation_section ) {
				$array['block-class']  = $class;
				$array['block-styles'] = $gsap_styles[ $block_animation ];
			} elseif ( 'figure' === $block_animation_section ) {
				$array['figure-class']  = $class;
				$array['figure-styles'] = $gsap_styles[ $block_animation ];
			} else {
				$array['body-class']  = $class;
				$array['body-styles'] = $gsap_styles[ $block_animation ];
			}
		} else {
			$array['block-class']  = $class;
			$array['block-styles'] = $gsap_styles[ $block_animation ];
		}

		if ( $force_body ) {
			$array['block-class']  = '';
			$array['block-styles'] = '';
			$array['body-class']   = $class;
			$array['body-styles']  = $styles;
		}
	}

	return $array;
}

/**
 * Computes conditional layout settings for listing blocks.
 *
 * @param array $attributes Block attributes.
 * @return array
 */
function layout_conditionals( $attributes ) {
	$attributes = normalize_attribute_keys( $attributes );

	$show_excerpt   = 'row' === $attributes['listLayout'] ? 1 : $attributes['showExcerpt'];
	$show_byline    = isset( $attributes['postType'] ) && 'post' === $attributes['postType'] && ! empty( $attributes['showByline'] ) ? 1 : 0;
	$title_location = 'row' === $attributes['listLayout'] ? 'body' : $attributes['titleLocation'];
	$cta_location   = ( $show_excerpt || 'body' === $title_location ) && ! $show_byline ? 'body' : 'image';

	return array(
		'showExcerpt'   => $show_excerpt,
		'showByline'    => $show_byline,
		'titleLocation' => $title_location,
		'ctaLocation'   => $cta_location,
		'hasBottom'     => $show_excerpt || 'body' === $title_location || $show_byline,

	);
}

/**
 * Applies an alternate color theme based on the current post or defaults.
 *
 * @param array  $attributes Block attributes.
 * @param string $section Theme section key to apply.
 * @return array
 */
function alternate_theme( $attributes, $section ) {
	$attributes = normalize_attribute_keys( $attributes );

	$object = get_queried_object();
	$colors = wp_json_file_decode(
		CAPITOLA_CHILD_THEME_DIR . '/color-themes.json',
		array( 'associative' => true )
	);

	if ( is_object( $object ) && get_class( $object ) === 'WP_Post' ) {
		$use_default              = get_post_meta( $object->ID, 'useDefColorTheme', true );
		$theme                    = $use_default ? get_option( 'capitola_default_page_color_theme' ) : get_post_meta( $object->ID, 'pageColorTheme', true );
		$key                      = array_search( $theme, array_column( $colors, 'slug' ), true );
		$attributes['colorTheme'] = $colors[ $key ][ $section ];
	} else {
		$theme                    = get_option( 'capitola_default_page_color_theme' );
		$key                      = array_search( $theme, array_column( $colors, 'slug' ), true );
		$attributes['colorTheme'] = $colors[ $key ][ $section ];
	}
	return $attributes;
}
