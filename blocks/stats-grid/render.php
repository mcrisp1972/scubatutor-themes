<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $block->context );

$count = count( $block->inner_blocks );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                     => 'alignfull ' . ( $count < 4 ? ' --count-' . $count : '' ) . $animations['figure-class'] . ( $attributes['animatedStats'] ? ' js-animated-stats-grid' : '' ),
		'data-animated-stats-speed' => $attributes['animatedStatsSpeed'],
	)
);

?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> style="<?php echo $animations['figure-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
