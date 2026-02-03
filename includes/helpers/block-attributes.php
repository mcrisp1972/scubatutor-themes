<?php

namespace Capitola\Helpers\Block_Attributes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns CSS class names for parallax images.
 *
 * @param bool $condition Whether to apply parallax classes.
 * @return string
 */
function parallax_img_class( $condition ) {
	return $condition ? '--img-parallax js-imgParallax' : '';
}

/**
 * Builds block animation classes and data attributes.
 *
 * @param array $attributes Block attributes.
 * @param bool  $force_body Force animation on body section.
 * @return array
 */
function animation_attributes( $attributes, $force_body = false ) {
	$direction = ! empty( $attributes['introAlign'] ) ? $attributes['introAlign'] : 'top';
	$gsap_data = array(
		'fadeup'    => ' data-start-translate="translateY(100px)" data-end-translate="translateY(0)"',
		'fadein'    => 'data-start-translate="translateY(0)" data-end-translate="translateY(0)"',
		'fadeleft'  => 'data-start-translate="translateX(-100%)" data-end-translate="translateX(0)"',
		'faderight' => 'data-start-translate="translateX(100%)" data-end-translate="translateX(0)"',
	);
	$class     = '';
	$array     = array(
		'block-class'  => '',
		'body-class'   => '',
		'figure-class' => '',
		'block-data'   => '',
		'body-data'    => '',
		'figure-data'  => '',
	);

	$block_animation         = ! empty( $attributes['revealAnimation'] ) ? $attributes['revealAnimation'] : '';
	$block_animation_section = ! empty( $attributes['revealSection'] ) ? $attributes['revealSection'] : '';
	$intro_align             = ! empty( $attributes['introAlign'] ) ? $attributes['introAlign'] : 'top';

	if ( ! empty( $block_animation ) ) {
		$class = ' js-revealAnimation';
		if ( 'fadeslide' === $block_animation ) {
			if ( 'figure' === $block_animation_section && $intro_align ) {
				$data = $gsap_data[ 'fade' . ( 'right' === $intro_align ? 'left' : 'right' ) ];
			} elseif ( $intro_align ) {
				$data = $gsap_data[ 'fade' . ( 'top' === $intro_align ? 'left' : $intro_align ) ];
			}
		} else {
			$data = $gsap_data[ $block_animation ];
		}

		if ( $block_animation_section ) {

			if ( 'block' === $block_animation_section ) {
				$array['block-class'] = $class;
				$array['block-data']  = $data;
			} elseif ( 'figure' === $block_animation_section ) {
				$array['figure-class'] = $class;
				$array['figure-data']  = $data;
			} else {
				$array['body-class'] = $class;
				$array['body-data']  = $data;
			}
		} else {
			$array['block-class'] = $class;
			$array['block-data']  = $data;
		}

		if ( $force_body ) {
			$array['block-class'] = '';
			$array['block-data']  = '';
			$array['body-class']  = $class;
			$array['body-data']   = $data;
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
