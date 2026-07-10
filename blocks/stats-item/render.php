<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Blocks\Stats_Item\get_stat_parts;

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="wp-block-capitola-stats-item__stat --hl-xl " >
		<?php
		if ( $block->context['capitola/animatedStats'] ) :
			?>
			<?php echo wp_kses_post( get_stat_parts( $attributes['stat'] ) ); ?>
		<?php else : ?>
			<?php echo esc_html( $attributes['stat'] ); ?>
		<?php endif; ?>
	</div>
	<p class="wp-block-capitola-stats-item__caption --micro-text">
		<?php echo esc_html( $attributes['caption'] ); ?>
	</p>
</div>
