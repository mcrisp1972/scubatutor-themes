<?php

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $block->context );

$count = count( $block->inner_blocks );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $animations['figure-class'] . ( $count < 4 ? ' --count-' . $count : '' ),
	)
);

?>
<div <?= wp_kses_data( $wrapper_attributes ) ?> <?= wp_kses_data( $animations['figure-data'] ) ?>>
	<?= wp_kses_post( $content ) ?>
</div>
