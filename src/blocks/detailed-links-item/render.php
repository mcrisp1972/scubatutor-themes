<?php
if ( ! $attributes['postId'] ) {
	return;
}

$image_id = $attributes['linkImage']['id'] ? $attributes['linkImage']['id'] : get_post_thumbnail_id( $attributes['postId'] );
$excerpt = $attributes['linkExcerpt'] ? $attributes['linkExcerpt'] : get_post_field( 'post_excerpt', $attributes['postId'] );

?>
<article <?= wp_kses_data( get_block_wrapper_attributes() ) ?>>
	<?php if ( ! empty( $block->context['showImage'] ) && $image_id ) : ?>
		<figure class="wp-block-cwps-detailed-links-item__image">
			<?= wp_get_attachment_image( $image_id, 'medium' ) ?>
		</figure>
	<?php endif; ?>
	<div class="wp-block-cwps-detailed-links-item__body">
		<a class="wp-block-cwps-detailed-links-item__title --hl-s" href="<?= esc_url( get_the_permalink( $attributes['postId'] ) ) ?>">
			<?= esc_html( $attributes['linkTitle'] ? $attributes['linkTitle'] : get_the_title( $attributes['postId'] ) ) ?>
		</a>
		<?php if ( $excerpt && ! empty( $block->context['showExcerpt'] ) ) : ?>
			<p class="wp-block-cwps-detailed-links-item__excerpt">
				<?= esc_html( $excerpt ) ?>
			</p>
		<?php endif; ?>
	</div>
</article>
