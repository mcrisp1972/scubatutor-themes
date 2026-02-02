<div <?= wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?= wp_kses_post( $content ); ?>
</div>
