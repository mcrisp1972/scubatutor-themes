<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Blocks\Stats_Item\get_stat_parts;

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-stats-item__stat --hl-xl " >
		<?php
		if ( $block->context['capitola/animatedStats'] ) :
			?>
			<?php echo get_stat_parts( $attributes['stat'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php else : ?>
			<?php echo esc_html( $attributes['stat'] ); ?>
		<?php endif; ?>
	</div>
	<p class="wp-block-capitola-stats-item__caption --text-s">
		<?php echo esc_html( $attributes['caption'] ); ?>
	</p>
</div>
