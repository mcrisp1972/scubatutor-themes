<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

?>

<ul
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
		)
	)
);
?>
>
	<?php foreach ( $attributes['links'] as $link_obj ) : ?>
		<?php $html = render_link( $link_obj, 'wp-block-capitola-link-list__link', false ); ?>
		<?php if ( $html ) : ?>
			<li class="wp-block-capitola-link-list__line">
				<?php echo wp_kses_post( $html ); ?>
			</li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>
