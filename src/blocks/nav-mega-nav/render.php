<?php

if ( empty( $attributes['title'] ) ) {
	return;
}

$submenu_id = 'submenu-' . wp_unique_id();

$main_link = \Capitola\Helpers\String_Helpers\render_link( $attributes, 'wp-block-capitola-nav__menu-item-link' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-nav__menu-item',
		'data-wp-context' => wp_json_encode(
			array(
				'isSubmenuOpen' => false,
				'submenuId' => $submenu_id,
			)
		),
		'data-wp-class----is-open' => 'context.isSubmenuOpen',
		'data-wp-watch' => 'callbacks.watchOpenSubmenu',
	)
);

?>

<li <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?php if ( $main_link ) : ?>
		<?= wp_kses_post( $main_link ) ?>
	<?php else : ?>
		<div class="wp-block-capitola-nav__menu-item-link --no-hover"><?= esc_html( $attributes['title'] ) ?></div>
	<?php endif; ?>
	<button type="button" class="wp-block-capitola-nav__menu-item-toggle" aria-label="expand submenu" tabindex="-1" data-wp-on--click="actions.toggleSubmenu" data-wp-class----is-open="context.isSubmenuOpen"></button>
	<div class="wp-block-capitola-nav__menu-item-caret"></div>
	<div class="wp-block-capitola-nav-mega-nav__sub-menu" data-wp-class----is-open="context.isSubmenuOpen">
		<div class="wp-block-capitola-nav-mega-nav__sub-menu-height">
			<?php if ( $attributes['headline'] || $attributes['intro'] ) : ?>
				<div class="wp-block-capitola-nav-mega-nav__head">
					<?php if ( $attributes['headline'] ) : ?>
						<div class="wp-block-capitola-nav-mega-nav__headline --hl-m">
							<?= esc_html( $attributes['headline'] ) ?>
						</div>
					<?php endif; ?>
					<?php if ( $attributes['intro'] ) : ?>
						<p class="wp-block-capitola-nav-mega-nav__intro">
							<?= wp_kses_post( $attributes['intro'] ) ?>
						</p>
					<?php endif; ?>
				</div>
			<?php endif; ?>
			<ul class="wp-block-capitola-nav-mega-nav__sub-menu-items --row-limit-<?= esc_attr( $attributes['linksPerColumn'] ) ?>">
				<?= wp_kses_post( $content ) ?>
			</ul>
			<?php if ( $attributes['imageId'] ) : ?>
				<div class="wp-block-capitola-nav-mega-nav__image">
					<?= wp_get_attachment_image( $attributes['imageId'], 'medium_large', false, array( 'loading' => 'lazy' ) ) ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</li>
