<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$style_attribute = 'border-radius: var(--wp--preset--border-radius--' . $args['radius'] . ');' . ( $args['aspect_ratio'] && 'full' !== $args['aspect_ratio'] ? ' aspect-ratio: var(--wp--preset--aspect-ratio--' . $args['aspect_ratio'] . ');' : '' );

?>

<?php if ( $args['attributes']['externalImage'] ) : ?>
	<img
		src="<?php echo esc_url( $args['attributes']['imageUrl'] ); ?>"
		alt="<?php echo esc_attr( $args['attributes']['imageAlt'] ); ?>"
		loading="<?php echo $args['attributes']['isHeroVariation'] ? 'eager' : 'lazy'; ?>" style="<?php echo esc_attr( $style_attribute ); ?>"/>
<?php else : ?>
	<?php
	echo wp_get_attachment_image(
		$args['attributes']['sideImage']['id'],
		'large',
		null,
		array(
			'style' => $style_attribute,
		)
	)
	?>
	<?php
endif;
