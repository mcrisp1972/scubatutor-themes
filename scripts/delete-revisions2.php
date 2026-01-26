<?php

// wp eval-file wp-content/themes/santacruzdivers/batch-scripts/delete-revisions.php

$threshold_date = '';

$args = array(
	'post_type' => 'revision',
	'posts_per_page' => -1,
	'post_status' => 'inherit',
	'suppress_filters' => 1,
	'fields' => 'ids',
);

$query = new WP_Query( $args );

foreach ( $query->posts as $post_id ) {
	wp_delete_post( $post_id, true );
	$last_deleted = $post_id;
	echo $post_id . "\n";
}

echo 'done, deleted ' . $query->post_count . 'revisions, last deleted ID was ' . $last_deleted;
