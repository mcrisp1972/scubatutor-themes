<li class="wp-block-capitola-anchor-nav__item">
	<a class="wp-block-capitola-anchor-nav__link" href="<?= esc_url( str_starts_with( $attributes['anchor'], '#' ) ? $attributes['anchor'] : '#' . $attributes['anchor'] ); ?>"><?= esc_html( $attributes ['label'] ); ?></a>
</li>
