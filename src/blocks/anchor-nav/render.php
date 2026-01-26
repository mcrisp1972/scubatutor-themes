<?php

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull anchor-menu js-anchorBar --theme-' . $attributes['colorTheme'],
	)
);

?>

<nav <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-anchor-nav__width">
		<ul class="wp-block-cwps-anchor-nav__list">
			<?= wp_kses_post( $content ) ?>
		</ul>
	</div>
</nav>
