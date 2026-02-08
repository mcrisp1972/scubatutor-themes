<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-stats-item__stat --hl-xl">
		<?php echo esc_html( $attributes['stat'] ); ?>
	</div>
	<p class="wp-block-capitola-stats-item__caption --micro-text">
		<?php echo esc_html( $attributes['caption'] ); ?>
	</p>
</div>
