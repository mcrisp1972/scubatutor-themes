<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-nav__menu-item',
	)
);

$rendered_link = render_link( $attributes, 'wp-block-capitola-nav__menu-item-link' );

if ( $rendered_link ) :

	?>
	<li <?php echo wp_kses_data( $wrapper_attributes ); ?>>
		<?php echo wp_kses_post( $rendered_link ); ?>
	</li>

<?php endif; ?>
