<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-icon-item__icon-wrapper">
		<div class="wp-block-capitola-icon-item__icon" style="--capitola-icon-image: url('<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/svgs/icons/<?php echo esc_attr( $attributes['icon'] ); ?>.svg');"></div>
		</div>
	<div class="wp-block-capitola-icon-item__title --hl-s">
		<?php echo esc_html( $attributes['title'] ); ?>
	</div>
	<p class="wp-block-capitola-icon-item__caption --micro-text">
		<?php echo esc_html( $attributes['caption'] ); ?>
	</p>
</div>
