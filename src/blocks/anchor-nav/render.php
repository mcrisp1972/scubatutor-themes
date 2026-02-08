<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull anchor-menu js-anchorBar --theme-' . $attributes['colorTheme'],
	)
);
?>
<nav <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-anchor-nav__width">
		<ul class="wp-block-capitola-anchor-nav__list">
			<?php echo wp_kses_post( $content ); ?>
		</ul>
	</div>
</nav>
