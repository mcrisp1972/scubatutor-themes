<?php

$classes = array(
	'odd_children_class' => count( $block->inner_blocks ) % 2 !== 0 ? ' --odd-children' : '',
	'two_thirds_first_class' => ( count( $block->inner_blocks ) + 1 ) % 3 === 0 ? ' --two-thirds-first' : '',
	'two_thirds_first_two_class' => ( count( $block->inner_blocks ) + 2 ) % 3 === 0 ? ' --two-thirds-first --two-thirds-second' : '',
	'one_half_first_class' => $block->context['gridLayout'] === '4-col' && ( count( $block->inner_blocks ) + 1 ) % 4 === 0 ? ' --one-half-first' : '',
	'one_half_first_two_class' => $block->context['gridLayout'] === '4-col' && ( count( $block->inner_blocks ) + 2 ) % 4 === 0 ? ' --one-half-first --one-half-second' : '',
	'one_half_first_three_class' => $block->context['gridLayout'] === '4-col' && ( count( $block->inner_blocks ) + 3 ) % 4 === 0 ? ' --one-half-first --one-half-second --one-half-third' : '',
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'style' => '--cwps-excerpt-lines: ' . $block->context['excerptLines'] . ';',
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-image-link-grid__width">
		<div class="wp-block-cwps-image-link-grid__grid --theme-image-overlay --layout-<?= esc_attr( $block->context['gridLayout'] . ' ' . implode( ' ', $classes ) . ' ' . ( $block->context['gridGap'] ? '--grid-gap' : '' ) ) ?>">
			<?= wp_kses_post( $content ) ?>
		</div>
	</div>
</section>
