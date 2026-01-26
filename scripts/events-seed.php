<?php

use cwps\LoremIpsum;

require_once CWPS_THEME_DIR . '/scripts/lorem-ipsum.php';

// query media library for images that have meta value
$args = array(
	'post_type' => 'attachment',
	'post_status' => 'inherit',
	'posts_per_page' => -1,
	'fields' => 'ids',
	'meta_query' => array(
		array(
			'key' => 'example_image',
			'value' => '1',
			'compare' => '=',
		),
	),
);

$images_ids = get_posts( $args );

$count = 40;

$lipsum = new LoremIpsum();

while ( $count ) {
	tribe_create_event(
		array(
			'post_content' => $lipsum->paragraphs( 5 ),
			'post_title' => $lipsum->words( 5 ),
			'post_excerpt' => $lipsum->paragraphs( 1 ),
			'post_status' => 'publish',
			'EventStartDate' => '2024-05-19',
			'EventEndDate' => '2024-05-19',
			// 'EventAllDay' => true,
			'FeaturedImage' => $images_ids[ array_rand( $images_ids ) ],
		)
	);
	--$count;
}
