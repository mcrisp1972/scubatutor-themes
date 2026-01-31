<?php

// wp eval-file wp-content/themes/santacruzdivers/scripts/update-amenities.php

$terms = new WP_Term_Query(
	array(
		'taxonomy' => 'trip_amenities',
		'hide_empty' => false,
		'fields' => 'ids',
	)
);

foreach ( $terms->terms as $term_id ) {
	if ( get_term_meta( $term_id, 'icon_source', true ) === 'icon-library' ) {
		$icon = get_term_meta( $term_id, 'icon', true );
		$src = $icon ? CAPITOLA_THEME_URL . '/assets/svgs/icons/' . $icon : '';
	} else {
		$image = get_term_meta( $term_id, 'image', true );
		$src = $image ? wp_get_attachment_image_src( $image, 'full' ) : '';
	}
	update_term_meta( $term_id, 'icon_src', $src );

}
