<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

if ( ! $attributes['title'] ) {
	return;
}

if ( 'post-type' === $attributes['populationMethod'] ) {
	$links = get_posts(
		array(
			'post_type'      => $attributes['autoPopulatePostType'],
			'posts_per_page' => 40,
			'orderby'        => 'menu_order',
			'order'          => 'asc',
		)
	);

} elseif ( 'children' === $attributes['populationMethod'] && null !== $attributes['link']['id'] && null !== $attributes['link']['type'] ) {
	$links = get_posts(
		array(
			'post_type'      => $attributes['link']['type'],
			'posts_per_page' => 40,
			'orderby'        => 'menu_order',
			'order'          => 'asc',
			'post_parent'    => $attributes['link']['id'],
		)
	);
} else {
	$links = false;
}

$main_link = render_link( $attributes, 'wp-block-capitola-nav__menu-item-link' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                    => 'wp-block-capitola-nav__menu-item',
		'data-wp-context'          => wp_json_encode(
			array(
				'isSubmenuOpen' => false,
				'submenuId'     => 'submenu-' . wp_unique_id(),
			)
		),
		'data-wp-class----is-open' => 'context.isSubmenuOpen',
		'data-wp-watch'            => 'callbacks.watchOpenSubmenu',
	)
);

?>

<li <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php if ( $main_link ) : ?>
		<?php echo wp_kses_post( $main_link ); ?>
	<?php else : ?>
		<div class="wp-block-capitola-nav__menu-item-link --no-hover"><?php echo esc_html( $attributes['title'] ); ?></div>
	<?php endif; ?>

	<button type="button" class="wp-block-capitola-nav__menu-item-toggle" aria-label="expand submenu" tabindex="-1" data-wp-on--click="actions.toggleSubmenu" data-wp-class----is-open="context.isSubmenuOpen"></button>
	<div class="wp-block-capitola-nav__menu-item-caret"></div>

	<div class="wp-block-capitola-nav-dropdown__sub-menu <?php echo esc_attr( $attributes['alignment'] ); ?>" data-wp-class----is-open="context.isSubmenuOpen">
		<div class="wp-block-capitola-nav-dropdown__sub-menu-height">
			<ul class="wp-block-capitola-nav-dropdown__sub-menu-items">
				<?php if ( $links ) : ?>
					<?php foreach ( $links as $nav_link ) : ?>
						<?php
							echo wp_kses_post(
								render_block(
									array(
										'blockName' => 'capitola/nav-sublink',
										'attrs'     => array(
											'title' => $nav_link->post_title,
											'link'  => array(
												'url' => get_the_permalink( $nav_link->ID ),
											),
										),
									)
								)
							);
						?>
					<?php endforeach; ?>
				<?php else : ?>
					<?php echo wp_kses_post( $content ); ?>
				<?php endif; ?>
			</ul>
		</div>
	</div>
</li>
