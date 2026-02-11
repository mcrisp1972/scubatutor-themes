<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$rendered_link = render_link( $attributes, 'wp-block-capitola-nav-sublink__link' );

if ( $rendered_link ) :
	?>
	<li <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
		<?php echo wp_kses_post( $rendered_link ); ?>
	</li>
<?php endif; ?>
