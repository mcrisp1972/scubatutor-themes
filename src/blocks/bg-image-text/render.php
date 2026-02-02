<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignfull --theme-' . $attributes['colorTheme'],
			'id' => $attributes['anchor'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-bg-image-text__imagewrap <?= esc_attr( \Capitola\Helpers\Block_Attributes\parallax_img_class( ( $attributes['imageParallax'] ) ) ); ?>" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?= wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
	</div>
	<div class="wp-block-capitola-bg-image-text__width --has-<?= esc_attr( $attributes['introAlign'] ); ?>-intro <?= esc_attr( 'none' !== $attributes['introRadius'] ? ' --has-' . $attributes['introRadius'] . '-radius' : '' ); ?>">
		<?= wp_kses_post( $content ); ?>
	</div>
</section>
