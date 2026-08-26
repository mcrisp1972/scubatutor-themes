<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$style = '--capitola-icon-image: url(' . esc_url( get_template_directory_uri() )
. '/assets/svgs/icons/' . $attributes['icon'] . '.svg);';

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-icon-item__icon-wrapper">
		<div class="wp-block-capitola-icon-item__icon" style="<?php echo esc_attr( $style ); ?>"></div>
	</div>
	<div class="wp-block-capitola-icon-item__title --hl-s">
		<?php echo esc_html( $attributes['title'] ); ?>
	</div>
	<p class="wp-block-capitola-icon-item__caption --text-s">
		<?php echo esc_html( $attributes['caption'] ); ?>
	</p>
</div>
