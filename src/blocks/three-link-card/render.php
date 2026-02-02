<<?= $attributes['postId'] ? 'a href="' . esc_url( get_the_permalink( $attributes['postId'] ) ) . '"' : 'div'; ?>
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'js-threeLinkCard',
		),
	)
);
?>
>
	<div class="wp-block-capitola-three-link-card__image <?= esc_attr( $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '' ); ?>">
		<?= wp_get_attachment_image( $attributes['image']['id'] ?: get_post_thumbnail_id( $attributes['postId'] ), 'medium_large' ); ?>
	</div>
	<div class="wp-block-capitola-three-link-card__title --hl-s">
		<?= esc_html( $attributes['title'] ?: get_the_title( $attributes['postId'] ) ); ?>
	</div>
</<?= $attributes['postId'] ? 'a' : 'div'; ?>>
