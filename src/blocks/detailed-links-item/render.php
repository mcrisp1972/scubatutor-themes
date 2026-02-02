<?php
if ( ! $attributes['postId'] ) {
	return;
}

$capitola_image_id = $attributes['linkImage']['id'] ? $attributes['linkImage']['id'] : get_post_thumbnail_id( $attributes['postId'] );
$capitola_excerpt = $attributes['linkExcerpt'] ? $attributes['linkExcerpt'] : get_post_field( 'post_excerpt', $attributes['postId'] );

?>
<article <?= wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php if ( ! empty( $block->context['showImage'] ) && $capitola_image_id ) : ?>
		<figure class="wp-block-capitola-detailed-links-item__image">
			<?= wp_get_attachment_image( $capitola_image_id, 'medium' ); ?>
		</figure>
	<?php endif; ?>
	<div class="wp-block-capitola-detailed-links-item__body">
		<a class="wp-block-capitola-detailed-links-item__title --hl-s" href="<?= esc_url( get_the_permalink( $attributes['postId'] ) ); ?>">
			<?= esc_html( $attributes['linkTitle'] ? $attributes['linkTitle'] : get_the_title( $attributes['postId'] ) ); ?>
		</a>
		<?php if ( $capitola_excerpt && ! empty( $block->context['showExcerpt'] ) ) : ?>
			<p class="wp-block-capitola-detailed-links-item__excerpt">
				<?= esc_html( $capitola_excerpt ); ?>
			</p>
		<?php endif; ?>
	</div>
</article>
