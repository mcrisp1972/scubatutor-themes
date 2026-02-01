<?php

namespace Capitola\Helpers\Block_Attributes;

function parallax_img_class( $condition ) {
	return $condition ? '--img-parallax js-imgParallax' : '';
}

// built block animation values
function animation_attributes( $attributes, $force_body = false ) {
	$direction = ! empty( $attributes['introAlign'] ) ? $attributes['introAlign'] : 'top';
	$gsap_data = array(
		'fadeup' => ' data-start-translate="translateY(100px)" data-end-translate="translateY(0)"',
		'fadein' => 'data-start-translate="translateY(0)" data-end-translate="translateY(0)"',
		'fadeleft' => 'data-start-translate="translateX(-100%)" data-end-translate="translateX(0)"',
		'faderight' => 'data-start-translate="translateX(100%)" data-end-translate="translateX(0)"',
	);
	$class = '';
	$array = array(
		'block-class' => '',
		'body-class' => '',
		'figure-class' => '',
		'block-data' => '',
		'body-data' => '',
		'figure-data' => '',
	);

	$block_animation = ! empty( $attributes['revealAnimation'] ) ? $attributes['revealAnimation'] : '';
	$block_animation_section = ! empty( $attributes['revealSection'] ) ? $attributes['revealSection'] : '';
	$intro_align = ! empty( $attributes['introAlign'] ) ? $attributes['introAlign'] : 'top';

	if ( ! empty( $block_animation ) ) {
		$class = ' js-revealAnimation';
		if ( $block_animation === 'fadeslide' ) {
			if ( $block_animation_section === 'figure' && $intro_align ) {
				$data = $gsap_data[ 'fade' . ( $intro_align === 'right' ? 'left' : 'right' ) ];
			} elseif ( $intro_align ) {
				$data = $gsap_data[ 'fade' . ( $intro_align === 'top' ? 'left' : $intro_align ) ];
			}
		} else {
			$data = $gsap_data[ $block_animation ];
		}

		if ( $block_animation_section ) {

			if ( $block_animation_section === 'block' ) {
				$array['block-class'] = $class;
				$array['block-data'] = $data;
			} elseif ( $block_animation_section === 'figure' ) {
				$array['figure-class'] = $class;
				$array['figure-data'] = $data;
			} else {
				$array['body-class'] = $class;
				$array['body-data'] = $data;
			}
		} else {
			$array['block-class'] = $class;
			$array['block-data'] = $data;
		}

		if ( $force_body ) {
			$array['block-class'] = '';
			$array['block-data'] = '';
			$array['body-class'] = $class;
			$array['body-data'] = $data;
		}
	}

	return $array;
}

// used
function layout_conditionals( $attributes ) {
	$show_excerpt = $attributes['listLayout'] === 'row' ? 1 : $attributes['showExcerpt'];
	$show_byline = isset( $attributes['postType'] ) && $attributes['postType'] === 'post' && ! empty( $attributes['showByline'] ) ? 1 : 0;
	$title_location = $attributes['listLayout'] === 'row' ? 'body' : $attributes['titleLocation'];
	$cta_location = ( $show_excerpt || $title_location === 'body' ) && ! $show_byline ? 'body' : 'image';

	return array(
		'showExcerpt' => $show_excerpt,
		'showByline' => $show_byline,
		'titleLocation' => $title_location,
		'ctaLocation' => $cta_location,
		'hasBottom' => $show_excerpt || $title_location === 'body' || $show_byline,

	);
}

function alternate_theme( $attributes, $section ) {
	$object = get_queried_object();
	$json_string = file_get_contents( CAPITOLA_CHILD_THEME_DIR . '/color-themes.json' );
	$colors = json_decode( $json_string, true );

	if ( is_object( $object ) && get_class( $object ) === 'WP_Post' ) {
		$use_default = get_post_meta( $object->ID, 'useDefColorTheme', true );
		$theme = $use_default ? get_option( 'capitola_default_page_color_theme' ) : get_post_meta( $object->ID, 'pageColorTheme', true );
		$key = array_search( $theme, array_column( $colors, 'slug' ) );
		$attributes['colorTheme'] = $colors[ $key ][ $section ];
	} else {
		$theme = get_option( 'capitola_default_page_color_theme' );
		$key = array_search( $theme, array_column( $colors, 'slug' ) );
		$attributes['colorTheme'] = $colors[ $key ][ $section ];
	}
	return $attributes;
}
