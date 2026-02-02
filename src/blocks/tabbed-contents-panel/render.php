<div
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'data-wp-context' => wp_json_encode( array( 'panelIndex' => $attributes['pillLabel'] ) ),
			'data-wp-class----active' => 'state.isSelected',
		)
	)
);
?>
>
	<?= wp_kses_post( $content ); ?>
</div>
