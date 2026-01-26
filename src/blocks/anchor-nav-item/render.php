<?php

$anchor_link = str_starts_with( $attributes['anchor'], '#' ) ? $attributes['anchor'] : '#' . $attributes['anchor'];

?>

<li class="wp-block-cwps-anchor-nav__item">
	<a class="wp-block-cwps-anchor-nav__link" href="<?= esc_url( $anchor_link ) ?>"><?= esc_html( $attributes ['label'] ) ?></a>
</li>
