<?php

$rendered_link = \cwps\helpers\stringHelpers\render_link( $attributes, 'wp-block-cwps-nav__menu-item-link' );

if ( $rendered_link ) :
	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => 'wp-block-cwps-nav__menu-item',
		)
	);

	?>
	<li <?= wp_kses_data( $wrapper_attributes ) ?>>
		<?= wp_kses_post( $rendered_link ) ?>
	</li>

<?php endif; ?>
