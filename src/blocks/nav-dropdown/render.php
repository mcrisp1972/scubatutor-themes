<?php

use function Capitola\Helpers\String_Helpers\render_link;

if ( ! $attributes['title'] ) {
	return;
}

$capitola_main_link = render_link( $attributes, 'wp-block-capitola-nav__menu-item-link' );

?>

<li 
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'wp-block-capitola-nav__menu-item',
			'data-wp-context' => wp_json_encode(
				array(
					'isSubmenuOpen' => false,
					'submenuId' => 'submenu-' . wp_unique_id(),
				)
			),
			'data-wp-class----is-open' => 'context.isSubmenuOpen',
			'data-wp-watch' => 'callbacks.watchOpenSubmenu',
		)
	)
);
?>
>
	<?php if ( $capitola_main_link ) : ?>
		<?= wp_kses_post( $capitola_main_link ); ?>
	<?php else : ?>
		<div class="wp-block-capitola-nav__menu-item-link --no-hover"><?= esc_html( $attributes['title'] ); ?></div>
	<?php endif; ?>

	<button type="button" class="wp-block-capitola-nav__menu-item-toggle" aria-label="expand submenu" tabindex="-1" data-wp-on--click="actions.toggleSubmenu" data-wp-class----is-open="context.isSubmenuOpen"></button>
	<div class="wp-block-capitola-nav__menu-item-caret"></div>

	<div class="wp-block-capitola-nav-dropdown__sub-menu <?= esc_attr( $attributes['alignment'] ); ?>" data-wp-class----is-open="context.isSubmenuOpen">
		<div class="wp-block-capitola-nav-dropdown__sub-menu-height">
			<ul class="wp-block-capitola-nav-dropdown__sub-menu-items">
				<?= wp_kses_post( $content ); ?>
			</ul>
		</div>
	</div>
</li>
