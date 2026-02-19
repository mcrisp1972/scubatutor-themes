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
<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php echo wp_kses_post( $content ); ?>
</div>
