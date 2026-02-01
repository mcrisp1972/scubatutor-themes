<?php

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
	)
);

?>

<ul <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?php foreach ( $attributes['links'] as $link_obj ) : ?>
		<?php $html = \Capitola\Helpers\String_Helpers\render_link( $link_obj, 'wp-block-cwps-link-list__link', false ); ?>
		<?php if ( $html ) : ?>
			<li class="wp-block-cwps-link-list__line">
				<?= wp_kses_post( $html ) ?>
			</li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>
