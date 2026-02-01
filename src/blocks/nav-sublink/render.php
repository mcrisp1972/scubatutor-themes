<?php

$rendered_link = \Capitola\Helpers\String_Helpers\render_link( $attributes, 'wp-block-cwps-nav-sublink__link' );

if ( $rendered_link ) :
	$wrapper_attributes = get_block_wrapper_attributes();
	?>
	<li <?= wp_kses_data( $wrapper_attributes ) ?>>
		<?= wp_kses_post( $rendered_link ) ?>
	</li>
<?php endif; ?>
