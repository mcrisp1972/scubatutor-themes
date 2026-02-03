<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $block->context );

$capitola_count = count( $block->inner_blocks );

?>
<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => $capitola_animations['figure-class'] . ( $capitola_count < 4 ? ' --count-' . $capitola_count : '' ),
		)
	)
);
?>
<?php echo wp_kses_data( $capitola_animations['figure-data'] ); ?>>
	<?php echo wp_kses_post( $content ); ?>
</div>
