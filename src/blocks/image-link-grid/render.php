<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$capitola_classes = array(
	'odd_children_class'         => count( $block->inner_blocks ) % 2 !== 0 ? ' --odd-children' : '',
	'two_thirds_first_class'     => ( count( $block->inner_blocks ) + 1 ) % 3 === 0 ? ' --two-thirds-first' : '',
	'two_thirds_first_two_class' => ( count( $block->inner_blocks ) + 2 ) % 3 === 0 ? ' --two-thirds-first --two-thirds-second' : '',
	'one_half_first_class'       => '4-col' === $block->context['gridLayout'] && ( count( $block->inner_blocks ) + 1 ) % 4 === 0 ? ' --one-half-first' : '',
	'one_half_first_two_class'   => '4-col' === $block->context['gridLayout'] && ( count( $block->inner_blocks ) + 2 ) % 4 === 0 ? ' --one-half-first --one-half-second' : '',
	'one_half_first_three_class' => '4-col' === $block->context['gridLayout'] && ( count( $block->inner_blocks ) + 3 ) % 4 === 0 ? ' --one-half-first --one-half-second --one-half-third' : '',
);

?>

<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'style' => '--capitola-excerpt-lines: ' . $block->context['excerptLines'] . ';',
		)
	)
);
?>
>
	<div class="wp-block-capitola-image-link-grid__width">
		<div class="wp-block-capitola-image-link-grid__grid --theme-image-overlay --layout-<?php echo esc_attr( $block->context['gridLayout'] . ' ' . implode( ' ', $capitola_classes ) . ' ' . ( $block->context['gridGap'] ? '--grid-gap' : '' ) ); ?>">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
</section>
