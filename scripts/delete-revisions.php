<?php

// wp eval-file web/wp-content/themes/santacruzdivers/scripts/delete_revisions.php


$args = array(
	'post_type' => 'revision',
	'posts_per_page' => -1,
	'post_status' => 'inherit',
	'suppress_filters' => 1,
	'fields' => 'ids',
	'orderby' => 'ID',
	'order' => 'DESC',
	'date_query' => array(
		'before' => date( 'Y-m-d 00:00:00', strtotime( '-6 months' ) ),
	),
);

$query = new WP_Query( $args );

foreach ( $query->posts as $post_id ) {
	wp_delete_post( $post_id, true );
	$last_deleted = $post_id;
	echo $post_id . "\n";
}

echo 'done, deleted ' . $query->post_count . 'revisions, last deleted ID was ' . $last_deleted;
