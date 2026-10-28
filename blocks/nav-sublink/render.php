<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$rendered_link = render_link( $attributes, 'wp-block-capitola-nav-sublink__link' );

if ( $rendered_link ) :
	?>
	<li <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<?php echo $rendered_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</li>
<?php endif; ?>
