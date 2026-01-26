<?php

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'data-wp-interactive' => 'cwps-accordion',
		'data-wp-context' => wp_json_encode(
			array(
				'keepOpen' => $attributes['keepOpen'],
				'activeItemId' => null,
			)
		),
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-accordion__list">
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
