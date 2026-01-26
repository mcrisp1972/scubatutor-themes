<?php

// lando wp eval-file wp-content/themes/santacruzdivers/scripts/course-template-migration.php

$before_content = '<!-- wp:acf/post-headline {"align":"wide","name":"acf/post-headline","data":{"field_63e7d8350b187":"1","field_62340fe69815b":"h1","field_61ef83af79896":"center","field_63e7d9230b189":"1","field_63e7d9b50b18a":"1","field_63e7da0d0b18b":"1"},"mode":"preview"} /-->

<!-- wp:acf/featured-slider {"align":"wide","name":"acf/featured-slider","data":{"field_62340fe69815c":"fade","field_62340fe69815d":"bullets","field_63dbe2c9bfea4":"1","field_62b8aa1a58b45":""},"mode":"auto"} /-->';

$after_content = '<!-- wp:acf/post-details {"name":"acf/post-details","data":{},"mode":"preview"} /-->';

$args = array(
	'post_type' => array( 'course' ),
	// 'posts_per_page' => 10000,
	'posts_per_page' => -1,
	'post_status' => 'any',
	'suppress_filters' => 1,
	'fields' => 'all',
	'orderby' => 'ID',
	'order' => 'DESC',
);

$query = new WP_Query( $args );

foreach ( $query->posts as $post ) {

	// wp_update_post( [
	// 'ID' => $post->ID,
	// 'post_content' => $before_content . $post->post_content . $after_content,
	// ] );


	echo $post->ID . "\n";
}

// error_log('done, last deleted ' . $last_deleted);
