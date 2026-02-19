<?php

namespace Capitola\Blocks\Page_Nav;

use function Capitola\Helpers\String_Helpers\render_link;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$prev_page = render_link( $attributes['prevPage'], 'wp-block-capitola-page-nav__prev' );
$next_page = render_link( $attributes['nextPage'], 'wp-block-capitola-page-nav__next' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding',
	)
);

?>

<nav <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-page-nav__width alignwide">
		<?php echo wp_kses_post( $prev_page ); ?>
		<?php echo wp_kses_post( $next_page ); ?>
	</div>
</nav>
