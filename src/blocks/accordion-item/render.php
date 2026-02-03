<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div 
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'data-wp-context'          => wp_json_encode(
				array(
					'itemId'     => wp_unique_id( 'accordion-item-' ),
					'itemIsOpen' => false,
				)
			),
			'data-wp-class----is-open' => 'state.isOpen',
		)
	)
);
?>
>
	<button class="wp-block-capitola-accordion-item__headline --hl-s" type="button" aria-label="Toggle Accordion" data-wp-on--click="actions.toggle" data-wp-bind--aria-expanded="state.isOpen">
		<?php echo esc_html( $attributes['headline'] ); ?>
	</button>
	<div class="wp-block-capitola-accordion-item__body" data-wp-bind--inert="!state.isOpen">
		<div class="wp-block-capitola-accordion-item__body-wrap">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
</div>
