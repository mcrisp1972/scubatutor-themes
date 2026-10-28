<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'      => 'alignfull anchor-menu js-anchorBar --theme-' . $attributes['colorTheme'],
		'aria-label' => 'Anchor Navigation',
	)
);
?>
<nav <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-anchor-nav__width">
		<ul class="wp-block-capitola-anchor-nav__list">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</ul>
	</div>
</nav>
