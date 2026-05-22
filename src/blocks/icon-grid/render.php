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
<div <?php echo wp_kses_data( $wrapper_attributes ); ?> style="<?php echo wp_kses_data( $animations['figure-styles'] ); ?>">
	<?php echo wp_kses_post( $content ); ?>
</div>
