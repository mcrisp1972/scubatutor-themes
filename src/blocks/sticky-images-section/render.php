<div
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'wp-block-capitola-sticky-images__body-section js-stickyImagesSection',
		)
	)
);
?>
>
	<figure class="wp-block-capitola-sticky-images__mobile-imageratio" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?= wp_get_attachment_image( $attributes['sideImage']['id'], 'large' ); ?>
		<?php if ( $attributes['showCaption'] ) : ?>
			<?php $capitola_caption = $attributes['captionOverride'] ?: wp_get_attachment_caption( $attributes['sideImage']['id'] ); ?>
			<?php if ( $capitola_caption ) : ?>
				<figcaption class="wp-block-capitola-sticky-images__image-caption --micro-text">
					<?= esc_html( $capitola_caption ); ?>
				</figcaption>
			<?php endif; ?>
		<?php endif; ?>
	</figure>
	<?= wp_kses_post( $content ); ?>
</div>
