<?php if ( $args['attributes']['externalImage'] ) : ?>
	<img src="<?= esc_url( $args['attributes']['imageUrl'] ); ?>" alt="<?= esc_attr( $args['attributes']['imageAlt'] ); ?>" class="<?= esc_attr( $args['image_ratio'] . $args['radius'] ); ?>" loading="<?= $args['attributes']['isHeroVariation'] ? 'eager' : 'lazy'; ?>"/>
<?php else : ?>
	<?=
	wp_get_attachment_image(
		$args['attributes']['sideImage']['id'],
		'large',
		null,
		array(
			'class' => $args['image_ratio'] . $args['radius'],
		)
	)
	?>
	<?php
endif;
