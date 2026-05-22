<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
$animations = animation_attributes( $block->context );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-detailed-links-list__list <?php echo esc_attr( $animations['figure-class'] ); ?>" style="<?php echo wp_kses_data( $animations['figure-styles'] ); ?>">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</div>
