<?php

use function Capitola\Helpers\String_Helpers\render_link;

?>

<ul
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
		)
	)
);
?>
>
	<?php foreach ( $attributes['links'] as $capitola_link_obj ) : ?>
		<?php $capitola_html = render_link( $capitola_link_obj, 'wp-block-capitola-link-list__link', false ); ?>
		<?php if ( $capitola_html ) : ?>
			<li class="wp-block-capitola-link-list__line">
				<?= wp_kses_post( $capitola_html ); ?>
			</li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>
