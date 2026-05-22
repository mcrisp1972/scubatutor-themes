<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-core-nav-meganav',
		// 'data-wp-interactive'      => 'capitola/core-nav-meganav',
	)
);

?>

<li <?php echo wp_kses_data( $wrapper_attributes ); ?>
	data-wp-interactive='{ "namespace": "capitola/core-nav-meganav" }'
	data-wp-watch="callbacks.initMenu"
	data-wp-watch--layout="callbacks.initMenuLayout"
	data-wp-on-window--resize="actions.handleResize"
	data-wp-context='{ "menuOpenedBy": { "click": false, "focus": false, "hover": false }, "showOnHover": "true"}'

data-wp-on--mouseenter="actions.handleMouseEnter"
		data-wp-on--mouseleave="actions.handleMouseLeave"


	>
	<div class="wp-block-navigation-link"><?php echo esc_html( $attributes['title'] ); ?></div>
	<button type="button" class="wp-block-navigation__submenu-icon" aria-label="expand submenu" tabindex="-1" data-wp-on--click="actions.toggleMenuOnClick" data-wp-bind--aria-expanded="state.isMenuOpen">
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg>
	</button>
	<div class="wp-block-navigation__submenu-caret"></div>

	<div class="wp-block-capitola-core-nav-meganav__sub-menu" data-wp-class--is-open="state.isMenuOpen">
		<div class="wp-block-capitola-core-nav-meganav__sub-menu-height">
			<div class="wp-block-capitola-core-nav-meganav__columns">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>
	</div>
</li>
