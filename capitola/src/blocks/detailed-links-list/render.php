<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-detailed-links-list__list">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</div>
