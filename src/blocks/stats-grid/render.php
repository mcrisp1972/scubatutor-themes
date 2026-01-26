<?php

$animations = \cwps\helpers\blockAttributes\animation_attributes( $block->context );

$count = count( $block->inner_blocks );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull ' . ( $count < 4 ? ' --count-' . $count : '' ) . $animations['figure-class'],
	)
);

?>
<div <?= wp_kses_data( $wrapper_attributes ) ?> <?= wp_kses_data( $animations['figure-data'] ) ?>>
	<?= wp_kses_post( $content ) ?>
</div>
