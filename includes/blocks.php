<?php

namespace cwps\Blocks;

const BLACKLIST = array(
	'core/archives',
	'core/avatar',
	'core/calendar',
	'core/categories',
	'core/code',
	'core/comment-author-name',
	'core/comments',
	'core/cover',
	'core/details',
	'core/file',
	'core/footnotes',
	'core/home-link',
	'core/latest-comments',
	'core/latest-posts',
	'core/loginout',
	// 'core/media-text',
	'core/more',
	'core/navigation',
	'core/navigation-link',
	'core/navigation-submenu',
	'core/nextpage',
	'core/page-list',
	'core/page-list-item',
	'core/post-author',
	'core/post-author-biography',
	'core/post-author-name',
	'core/post-comments-form',
	'core/post-date',
	'core/post-excerpt',
	'core/post-featured-image',
	'core/post-navigation-link',
	'core/post-terms',
	// 'core/post-title',
	'core/preformatted',
	// 'core/pullquote',
	'core/query',
	'core/query-no-results',
	'core/query-pagination',
	'core/query-pagination-next',
	'core/query-pagination-numbers',
	'core/query-pagination-previous',
	'core/query-title',
	'core/read-more',
	'core/rss',
	'core/search',
	'core/site-logo',
	'core/site-tagline',
	'core/site-title',
	'core/social-link',
	'core/social-links',
	'core/spacer',
	'core/tag-cloud',
	'core/term-description',
	'core/verse',
);

// register theme blocks
add_action( 'init', __NAMESPACE__ . '\register_blocks' );

function register_blocks() {

	foreach ( glob( CWPS_THEME_DIR . '/build/blocks/*' ) as $path ) {
		if ( is_dir( $path ) && file_exists( $path . '/block.json' ) ) {
			register_block_type( $path . '/block.json' );

			if ( is_dir( $path . '/includes' ) ) {
				foreach ( glob( $path . '/includes/*' ) as $file ) {
					require_once $file;
				}
			}
		}
	}

	// $block_paths = glob( CWPS_THEME_DIR . '/build/blocks/*/block.json' );

	// foreach ( $block_paths as $block_path ) {
	// $block_dir = dirname( $block_path );
	// $includes_dir = $block_dir . '/includes';

	// if ( is_dir( $includes_dir ) ) {
	// foreach ( glob( $includes_dir . '/*.php' ) as $file ) {
	// require_once $file;
	// }
	// }
	// }

	// wp_register_block_types_from_metadata_collection(
	// CWPS_THEME_DIR . '/build/blocks',
	// CWPS_THEME_DIR . '/build/blocks-manifest.php'
	// );
}

// add Dive Shop category and Template category
add_filter( 'block_categories_all', __NAMESPACE__ . '\cwps_block_categories' );

function cwps_block_categories( $categories ) {

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-nav-blocks',
			'title' => 'Navigation',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-hero-blocks',
			'title' => 'Heroes',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-listing-blocks',
			'title' => 'Listing Blocks',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-custom-blocks',
			'title' => 'Custom Blocks',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps_block_templates',
			'title' => 'Templates',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-course-blocks',
			'title' => 'Course Blocks',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-trip-blocks',
			'title' => 'Trip Blocks',
		)
	);

	array_unshift(
		$categories,
		array(
			'slug' => 'cwps-staff-blocks',
			'title' => 'Staff Blocks',
		)
	);

	return $categories;
}

add_filter( 'allowed_block_types_all', __NAMESPACE__ . '\allowed_block_types', 99, 2 );

function allowed_block_types( $blocks, $editor_context ) {
	// unregister_block_type function does not work for core blocks, we have to use this filter
	$blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

	$blacklist = array();

	// only allow header and footer to be inserted in site editor
	if ( $editor_context->name !== 'core/edit-site' ) {
		$blacklist[] = 'cwps/footer';
		$blacklist[] = 'cwps/nav';
		$blacklist[] = 'cwps/single-product-details';
		$blacklist[] = 'cwps/search-listings';
	} else {
		$blacklist[] = 'cwps/staff-details';
		$blacklist[] = 'cwps/course-details';
	}

	// editing a page
	if ( $editor_context->name !== 'core/edit-site' && isset( $editor_context->post->post_type ) ) {

		if ( $editor_context->post->post_type !== 'page' ) {
			$blacklist[] = 'cwps/paginated-listings';
			$blacklist[] = 'cwps/paginated-products';
			$blacklist[] = 'cwps/store-hero';
		}

		if ( $editor_context->post->post_type !== 'trip' ) {
			$blacklist[] = 'cwps/trip-amenities';
			$blacklist[] = 'cwps/trip-details';
		}

		if ( $editor_context->post->post_type !== 'staff' ) {
			$blacklist[] = 'cwps/staff-details';
		}

		if ( $editor_context->post->post_type !== 'course' ) {
			$blacklist[] = 'cwps/upcoming-classes';
		}

		if ( $editor_context->post->post_type !== 'class' ) {
			$blacklist[] = 'cwps/class-schedule';
		}

		if ( $editor_context->post->post_type !== 'course' && $editor_context->post->post_type !== 'class' ) {
			$blacklist[] = 'cwps/course-details';
			$blacklist[] = 'cwps/class-description';
			$blacklist[] = 'cwps/prerequisite-courses';
		}

		if ( $editor_context->post->post_type !== 'class' && $editor_context->post->post_type !== 'trip' ) {
			$blacklist[] = 'cwps/booking-widget';
			$blacklist[] = 'cwps/event-hero';
		}

		if ( $editor_context->post->post_type !== 'tribe_events' ) {
			$blacklist[] = 'cwps/event-map';
		}
	}

	// now unset plugin blocks
	foreach ( array_keys( $blocks ) as $name ) {
		// if( str_starts_with( $name, 'woocommerce/' ) ) {
		// $blacklist[] = $name;
		// }
		// else if( str_starts_with( $name, 'woocommerce-payments/' ) ) {
		// $blacklist[] = $name;
		// }
		// else

		if ( str_starts_with( $name, 'tribe/' ) ) {
			$blacklist[] = $name;
		} elseif ( str_starts_with( $name, 'tec/' ) ) {
			$blacklist[] = $name;
		} elseif ( str_starts_with( $name, 'safe-svg/' ) ) {
			$blacklist[] = $name;
		} elseif ( str_starts_with( $name, 'yoast-seo/' ) ) {
			$blacklist[] = $name;
		} elseif ( str_starts_with( $name, 'yoast/' ) ) {
			$blacklist[] = $name;
		}
	}

	foreach ( $blacklist as $name ) {
		unset( $blocks[ $name ] );
	}

	// error_log( print_r( array_keys( $blocks ), 1 ) );
	return array_keys( $blocks );
}

add_filter( 'block_type_metadata', __NAMESPACE__ . '\disable_inserter' );

function disable_inserter( $metadata ) {
	if ( in_array( $metadata['name'], BLACKLIST, true ) ) {
		$metadata['supports']['inserter'] = false;
	}

	return $metadata;
}

// disables block store that appears often when searching for a block
remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );
