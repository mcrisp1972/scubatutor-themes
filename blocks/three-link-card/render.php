<?php

$card_title = get_the_title( $attributes['postId'] );
if ( ! empty( $attributes['title'] ) ) {
	$card_title = $attributes['title'];
}

$image_id = get_post_thumbnail_id( $attributes['postId'] );
if ( ! empty( $attributes['image']['id'] ) ) {
	$image_id = $attributes['image']['id'];
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'js-threeLinkCard',
	),
);

?>
<<?php echo $attributes['postId'] ? 'a href="' . esc_url( get_the_permalink( $attributes['postId'] ) ) . '"' : 'div'; ?> <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-three-link-card__image <?php echo esc_attr( $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '' ); ?>">
		<?php echo wp_get_attachment_image( $image_id, 'medium_large' ); ?>
	</div>
	<div class="wp-block-capitola-three-link-card__title --hl-s">
		<?php echo esc_html( $card_title ); ?>
	</div>
</<?php echo $attributes['postId'] ? 'a' : 'div'; ?>>
