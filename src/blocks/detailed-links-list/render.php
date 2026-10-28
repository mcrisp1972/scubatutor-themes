<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
$animations = animation_attributes( $block->context );

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-detailed-links-list__list <?php echo esc_attr( $animations['figure-class'] ); ?>" style="<?php echo $animations['figure-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
