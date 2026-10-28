<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $block->context );

$count = count( $block->inner_blocks );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $animations['figure-class'] . ( $count < 4 ? ' --count-' . $count : '' ),
	)
)

?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> style="<?php echo $animations['figure-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
