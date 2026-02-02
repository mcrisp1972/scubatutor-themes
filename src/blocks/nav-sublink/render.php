<?php

use function Capitola\Helpers\String_Helpers\render_link;

$capitola_rendered_link = render_link( $attributes, 'wp-block-capitola-nav-sublink__link' );

if ( $capitola_rendered_link ) :
	?>
	<li <?= wp_kses_data( get_block_wrapper_attributes() ); ?>>
		<?= wp_kses_post( $capitola_rendered_link ); ?>
	</li>
<?php endif; ?>
