<?php

// lando wp eval-file wp-content/themes/santacruzdivers/scripts/delete_stk_island.php

// $args = [
// 'post_type' => 'revision',
// 'post_type' => 'acf-field',
// 'posts_per_page' => 1,
// 'posts_per_page' => -1,
// 'post__in' => [8454],
// 'post_status' => 'inherit',
// 'suppress_filters' => 1,
// 'fields' => 'ids',
// 'orderby' => 'ID',
// 'order' => 'DESC',
// ];

$args = array(
	'post_type' => array( 'page', 'post', 'tribe_events', 'trip', 'course', 'class', 'staff' ),
	// 'posts_per_page' => 10000,
	'posts_per_page' => -1,
	'post_status' => 'any',
	'suppress_filters' => 1,
	'fields' => 'ids',
	'orderby' => 'ID',
	'order' => 'DESC',
	'meta_query' => array(
		array(
			'key' => '_hero-header_cwps-hero',
			'compare' => 'EXISTS',
		),
	),
);

$query = new WP_Query( $args );

foreach ( $query->posts as $post_id ) {
	delete_field( 'hero-header_cwps-hero', $post_id );

	echo $post_id . "\n";
}
