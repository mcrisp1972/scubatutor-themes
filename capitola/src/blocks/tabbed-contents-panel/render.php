<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'data-wp-context'         => wp_json_encode( array( 'panelIndex' => $attributes['pillLabel'] ) ),
		'data-wp-class----active' => 'state.isSelected',
	)
);


?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
