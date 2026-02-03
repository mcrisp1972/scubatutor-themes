<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<li class="wp-block-capitola-anchor-nav__item">
	<a class="wp-block-capitola-anchor-nav__link" href="<?php echo esc_url( str_starts_with( $attributes['anchor'], '#' ) ? $attributes['anchor'] : '#' . $attributes['anchor'] ); ?>"><?php echo esc_html( $attributes ['label'] ); ?></a>
</li>
