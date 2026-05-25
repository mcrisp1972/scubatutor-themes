<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'capitola-accordion',
		'data-wp-context'     => wp_json_encode(
			array(
				'keepOpen'     => $attributes['keepOpen'],
				'activeItemId' => null,
			)
		),
	)
);
?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-accordion__list">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
