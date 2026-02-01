<?php

$image_id = $attributes['image']['id'] ?: get_post_thumbnail_id( $attributes['postId'] );
$card_title = $attributes['title'] ?: get_the_title( $attributes['postId'] );
$radius = $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '';
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'js-threeLinkCard',
	),
);

?>

	<<?= $attributes['postId'] ? 'a href="' . esc_url( get_the_permalink( $attributes['postId'] ) ) . '"' : 'div' ?> <?= wp_kses_data( $wrapper_attributes ) ?>>
		<div class="wp-block-capitola-three-link-card__image <?= esc_attr( $radius ) ?>">
			<?= wp_get_attachment_image( $image_id, 'medium_large' ) ?>
		</div>
		<div class="wp-block-capitola-three-link-card__title --hl-s">
			<?= esc_html( $card_title ) ?>
		</div>
	</<?= $attributes['postId'] ? 'a' : 'div' ?>>
