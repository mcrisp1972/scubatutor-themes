# Capitola Theme PHP Filter Hooks Reference

## Table of Contents

- [Usage](#usage)
- [Adding to a Filter](#adding-to-a-filter)
- [Available Filters](#available-filters)
  - [Images](#images)
    - [`capitola_fallback_img_post_types`](#capitola_fallback_img_post_types)
    - [`capitola_rest_post_type_has_image_props`](#capitola_rest_post_type_has_image_props)
    - [`capitola_rest_tax_has_image_props`](#capitola_rest_tax_has_image_props)
    - [`capitola_{postType}_fallback_image_id`](#capitola_posttype_fallback_image_id)
    - [`capitola_{taxonomy}_thumb_meta_name`](#capitola_taxonomy_thumb_meta_name)
  - [Taxonomy/Post Type Relationships](#taxonomypost-type-relationships)
    - [`capitola_{postType}_base_taxonomy`](#capitola_posttype_base_taxonomy)
    - [`capitola_{taxonomy}_tax_post_type`](#capitola_taxonomy_tax_post_type)
  - [Comments Filters](#comments-filters)
    - [`capitola_comments_allowed_post_types`](#capitola_comments_allowed_post_types)
  - [Theme Settings Filters](#theme-settings-filters)
    - [`capitola_child_theme_api_settings`](#capitola_child_theme_api_settings)
  - [Template Filters](#template-filters)
    - [`capitola_{postType}_cta_label`](#capitola_posttype_cta_label)
  - [Blocks](#blocks)
    - [`capitola_unregistered_parent_blocks`](#capitola_unregistered_parent_blocks)
    - [`capitola_block_categories`](#capitola_block_categories)
    - [`capitola_block_blacklist`](#capitola_block_blacklist)
    - [`capitola_{postType}_listings_query_args`](#capitola_posttype_listings_query_args)
    - [`capitola_related_{postType}_query_tax`](#capitola_related_posttype_query_tax)
    - [`capitola_related_{postType}_query`](#capitola_related_posttype_query)

This document lists all WordPress filters in the Capitola theme that use `apply_filters()` with a filter name beginning with "capitola". These filters allow developers to modify or extend theme functionality.

## Available Filters

### Images
---
### capitola_fallback_img_post_types
The theme is setup with a system of fallback featured images based on taxonomy terms and post types. By default, pages and posts have this enabled. Use this filter to enable any custom post type to also have this behavior. It prevents blank image containers in listings, heroes, etc.

**Applied in:**
- includes/images.php fallback_thumbnail_id()

**Parameters:**
- `$post_types` (array): List of post types.

**Returns:**
- (array) Modified list of post types.

**Example**
```php
add_filter(
	'capitola_fallback_img_post_types',
	function ( $post_types ) {
		$post_types[] = 'trip';
		return $post_types;
	}
);
```

### capitola_rest_post_type_has_image_props
Adds featured image properties to specific REST API post results. By default, pages and posts are enabled.

Enabled post types will have two new properties added to the returned JSON object: thumbnail_urls and image_html (result of wp_get_attachment_image()).

**Applied in:**
- includes/rest-extensions.php post_add_image()

**Parameters:**
- `$post_types` (array): List of enabled post types.

**Returns:**
- (array) Modified list of enabled post types.

**Example**
```php
add_filter(
	'capitola_fallback_img_post_types',
	function ( $post_types ) {
		$post_types[] = 'trip';
		return $post_types;
	}
);
```

### capitola_rest_tax_has_image_props
Adds featured image properties to REST API taxonomy term results. By default, category is enabled.

Enabled taxonomies types will have two new properties added to the returned JSON object: thumbnail_urls and image_html (result of wp_get_attachment_image())

**Applied in:**
- includes/rest-extensions.php post_add_image()

**Parameters:**
- `$taxonomies` (array): List of enabled taxonomies.

**Returns:**
- (array) Modified list of enabled taxonomies.

**Example**
```php
add_filter(
	'capitola_rest_tax_has_image_props',
	function ( $taxonomies ) {
		$taxonomies[] = 'trip_cat';
		return $taxonomies;
	}
);
```

### capitola_{postType}_fallback_image_id
Filters the post type's fallback image ID (if the post type is included in the capitola_fallback_img_post_types filter). Useful if a post type should have fallback image rules that differ from the default taxonomy -> ost-type fallback image order.

**Applied in:**
- includes/helpers/images.php post_image_id()

**Parameters:**
- `$id` (int|false): The fallback image ID or false.
- `$post` (WP_Post): The post object.

**Returns:**
- (int|false) Image ID or false.

**Example**
```php
add_filter(
	'capitola_product_fallback_image_id',
	function () {
		return get_option( 'woocommerce_placeholder_image' );
	},
	5,
	2
);
```

### capitola_{taxonomy}_thumb_meta_name
Defaults to 'term_thumb_id', which is the meta key the theme adds to terms when term images are enabled for the taxonomy. You should only need this filter if the taxonomy uses a different meta key for a thumbnail image.

**Applied in:**
- includes/helpers/images.php term_thumb_id()

**Parameters:**
- `$meta_name` (string): The meta key name.

**Returns:**
- (string) Meta key name.

**Example**
```php
add_filter(
	'capitola_product_brand_thumb_meta_name',
	function () {
		return 'thumbnail_id';
	},
	99
);
```

### Taxonomy/Post Type Relationships
---

### capitola_{postType}_base_taxonomy
Returns the "base" taxonomy for a given post type. Base taxonomy is the main taxonomy you want the post type to be categorized by, and applies to fallback images and listings pill labels.

**Applied in:**
- includes/helpers/images.php post_image_id()
- includes/helpers/string-helpers.php get_post_term_name()

**Parameters:**
- `$taxonomy` (string|false): The taxonomy name or false.

**Returns:**
- (string|false) Taxonomy name or false.

**Example**
```php
add_filter(
	'capitola_trip_base_taxonomy',
	function () {
		return 'trip_cat';
	}
);
```

### capitola_{taxonomy}_tax_post_type
Maps a post type to a taxonomy.

**Applied in:**
- includes/helpers/images.php term_thumb_id()

**Parameters:**
- `$post_type` (string|false): The post type or false.

**Returns:**
- (string|false) Post type or false.

**Example**
```php
add_filter(
	'capitola_trip_cat_tax_post_type',
	function () {
		return 'trip';
	}
);
```

## Comments Filters
---

### capitola_comments_allowed_post_types
By default, comments are disabled in the theme. This filter allows you to opt-in specific post types for commenting.

This mainly affects the return of the core comments_open() template function.

**Applied in:**
- includes/comments.php show_if_comments_enabled()
- includes/comments.php admin_disable_comments()

**Parameters:**
- `$post_types` (array): List of post types.

**Returns:**
- (array) Modified list of post types.

**Example**
```php
add_filter(
	'capitola_comments_allowed_post_types',
	function ( $post_types ) {
		$post_types[] = 'product';
		return $post_types;
	}
);
```

### Theme Settings Filters
---

### capitola_child_theme_api_settings
Adds additional fields to the APIs tab in the theme options panel.

**Applied in:**
- includes/theme-options.php add_options_page()

**Parameters:**
- `$fields` (array): List of fields.

**Returns:**
- (array) Modified list of fields.

**Example**
```php
function add_api_fields( $fields ) {
	$fields[] = array(
		'label'  => 'Open Weather API Key',
		'name'   => 'capitola_openweather_key',
		'option' => 'capitola_openweather_key',
		'type'   => 'text',
		'size'   => 'full',
	);
	return $fields;
}

add_filter( 'capitola_child_theme_api_settings', 'add_api_fields', 10, 1 );
```

### Template Filters
---

### capitola_{postType}_cta_label
Used in the REST API and some blocks, this filter allows you to set a default CTA Label for specific post types. They are typically used when content is loaded dynamically.

By default, pages have a default value of "View Page", and posts have a default value of "View Article"

**Applied in:**
- includes/page/page-rest-api.php extend_rest_endpoint()
- includes/posts/page-rest-api.php get_post_cta_label()
- src/blocks/image-link-grid-item/render.php

**Parameters:**
- `$label` (string): The CTA label.

**Returns:**
- (string) Modified CTA label.

**Example**
```php
add_filter(
	'capitola_trip_cta_label',
	function () {
		return 'View Trip';
	}
);
```

### Blocks
---

### capitola_unregistered_parent_blocks
This filter is specifically for unregistering custom blocks registered by this theme in your child theme. This should only be used if the child theme contains a custom block with the same name. Otherwise, use the `capitola_block_blacklist` filter instead.

**Applied in:**
- includes/blocks.php register_blocks()

**Parameters:**
- `$blocks` (array): List of block names.

**Returns:**
- (array) Modified list of block names.

**Example**
```php
add_filter(
	'capitola_unregistered_parent_blocks',
	function () {
		return array(
			'capitola/footer',
			'capitola/nav',
		);
	}
);
```

### capitola_block_categories
Allows you to add additional block categories specific to the child theme. Using this filter instead of a separate hook allows you to control the ordering of the categories.

**Applied in:**
- includes/blocks.php capitola_block_categories()

**Parameters:**
- `$categories` (array): List of block categories.

**Returns:**
- (array) Modified list of block categories.

**Example:**
```php
function block_categories( $categories ) {

	array_unshift(
		$categories,
		array(
			'slug'  => 'trip-blocks',
			'title' => 'Trip Blocks',
		)
	);

	return $categories;
}

add_filter( 'capitola_block_categories', 'block_categories' );
```

### capitola_block_blacklist
The theme blacklists many core blocks, as well as some custom blocks depending on the $editor_context. This filter allows you to add or remove blocks from the blacklist in your child theme.

Note: This filter does not unregister any blocks, it only disables the block inserter. This prevents any breakage of existing block placements or available patterns.

**Applied in:**
- includes/blocks.php allowed_block_types()

**Parameters:**
- `$blacklist` (array): List of block names.
- `$editor_context` (object): Editor context object.

**Returns:**
- (array) Modified list of block names.

**Example:**
```php
function add_blacklist( $blacklist, $editor_context ) {
	if ( 'core/edit-site' !== $editor_context->name ) {
		$blacklist[] = 'capitola/single-product-details';
	} else {
		$blacklist[] = 'capitola/staff-details';
		$blacklist[] = 'capitola/course-details';
	}

	if ( 'trip' !== $editor_context->post->post_type ) {
		$blacklist[] = 'capitola/trip-amenities';
		$blacklist[] = 'capitola/trip-details';
	}

	$blacklist[] = 'capitola/event-map';

	return $blacklist;
}

add_filter( 'capitola_block_blacklist', 'add_blacklist', 10, 2 );
```

### capitola_{postType}_listings_query_args
This filter is used by the Post Feed block to modify the WP_Query args before execution. A good use case is, say you are listing and event post type, and you want to only return future events.

**Applied in:**
- src/blocks/post-feed/includes.php query_post_listings()

**Parameters:**
- `$args` (array): The WP_Query arguments.
- `$attributes` (array) (optional): Block attributes.

**Returns:**
  - (array) Modified WP_Query arguments.

**Example:**
```php
function trips_listings_query_args( $args, $request ) {
	$args['meta_key'] = 'tripStartDate';
	$args['meta_query'] = array(
		array(
			'key'     => 'tripStartDate',
			'value'   => gmdate( 'Y-m-d' ) . 'T00:00:00',
			'compare' => '>=',
			'type'    => 'DATE',
		),
	);

	if ( 'event_date' === $request['orderBy'] ) {
		$args['orderby'] = 'meta_value';
	}

	return $args;
}

add_filter( 'capitola_trip_listings_query_args', 'trips_listings_query_args', 5, 2 );
```

### capitola_related_{postType}_query_tax
Returns the taxonomy name the block's WP_Query should use in its tax_query args.

**Applied in:**
- src/blocks/post-feed/includes.php query_post_listings()
- src/blocks/related-posts/includes.php query_related_posts()

**Parameters:**
- `$taxonomy` (string|false): The taxonomy name or false.

**Returns:**
- (string|false) Taxonomy name or false.

**Example:**
```php
add_filter(
	'capitola_related_trip_query_tax',
	function () {
		return 'View Trip';
	}
);
```

### capitola_related_{postType}_query
Allows you to modify WP_Query args for results in the Related Posts block.

**Applied in:**
- src/blocks/related-posts/includes.php query_related_posts()

**Parameters:**
- `$args` (array): The WP_Query arguments.
- `$post` (WP_Post) optional: The current post object.

**Returns:**
- (array) Modified WP_Query arguments.

**Example:**
```php
function related_trip_query_args( $args ) {
	$args['meta_key'] = 'tripStartDate';
	$args['orderby']  = 'meta_value';
	$args['order']    = 'asc';
	$args['meta_query'] = array(
		array(
			'key'     => 'tripStartDate',
			'value'   => gmdate( 'Y-m-d H:i:s' ),
			'type'    => 'DATE',
			'compare' => '>=',
		),
	);
	return $args;
}

add_filter( 'capitola_related_trip_query', 'related_trip_query_args', 5 );
```
