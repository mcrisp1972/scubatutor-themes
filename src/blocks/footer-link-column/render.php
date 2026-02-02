<div
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'wp-block-capitola-footer__menu',
		)
	)
);
?>
>
	<?php if ( $attributes['headline'] ) : ?>
		<?php if ( ! empty( $attributes['link']['url'] ) ) : ?>
			<a href="<?= esc_url( $attributes['link']['url'] ); ?>" class="wp-block-capitola-footer__top-link" <?= ! empty( $attributes['link']['opensInNewTab'] ) ? ' target="_blank"' : ''; ?>>
				<?= esc_html( $attributes['headline'] ); ?>
			</a>
		<?php else : ?>
			<div class="wp-block-capitola-footer__top-link">
				<?= esc_html( $attributes['headline'] ); ?>
			</div>
		<?php endif; ?>
	<?php endif; ?>
	<ul class="wp-block-capitola-footer__menu-items">
		<?= wp_kses_post( $content ); ?>
	</ul>
</div>
