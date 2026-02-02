<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-open-content__width alignwide is-layout-constrained">
		<div class="wp-block-capitola-open-content__content --justify-<?= esc_attr( $attributes['contentJustify'] ); ?> --align-<?= esc_attr( $attributes['textAlign'] ); ?>">
			<?= wp_kses_post( $content ); ?>
		</div>
	</div>
</section>
