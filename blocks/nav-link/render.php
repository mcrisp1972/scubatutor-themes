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
	<li <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<?php echo $rendered_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</li>

<?php endif; ?>
