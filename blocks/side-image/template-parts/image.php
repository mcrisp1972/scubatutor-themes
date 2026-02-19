<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<?php if ( $args['attributes']['externalImage'] ) : ?>
	<img src="<?php echo esc_url( $args['attributes']['imageUrl'] ); ?>" alt="<?php echo esc_attr( $args['attributes']['imageAlt'] ); ?>" class="<?php echo esc_attr( $args['image_ratio'] . $args['radius'] ); ?>" loading="<?php echo $args['attributes']['isHeroVariation'] ? 'eager' : 'lazy'; ?>"/>
<?php else : ?>
	<?php
	echo wp_get_attachment_image(
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
