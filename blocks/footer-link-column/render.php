<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-footer__menu',
	)
);


?>
<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php if ( $attributes['headline'] ) : ?>
		<?php if ( ! empty( $attributes['link']['url'] ) ) : ?>
			<h2 class="wp-block-capitola-footer__top-link">
				<a href="<?php echo esc_url( $attributes['link']['url'] ); ?>"<?php echo ! empty( $attributes['link']['opensInNewTab'] ) ? ' target="_blank"' : ''; ?>>
					<?php echo esc_html( $attributes['headline'] ); ?>
				</a>
			</h2>
		<?php else : ?>
			<h2 class="wp-block-capitola-footer__top-link">
				<?php echo esc_html( $attributes['headline'] ); ?>
			</h2>
		<?php endif; ?>
	<?php endif; ?>
	<ul class="wp-block-capitola-footer__menu-items">
		<?php echo wp_kses_post( $content ); ?>
	</ul>
</div>
