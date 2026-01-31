<?php

$attributes = $args['attributes'];

?>

<?php if ( $attributes['externalImage'] ) : ?>
	<img src="<?= esc_url( $attributes['imageUrl'] ) ?>" alt="<?= esc_attr( $attributes['imageAlt'] ) ?>" class="<?= esc_attr( $args['image_ratio'] . $args['radius'] ) ?>" loading="<?= $attributes['isHeroVariation'] ? 'eager' : 'lazy' ?>"/>
<?php else : ?>
	<?=
	wp_get_attachment_image(
		$attributes['sideImage']['id'],
		'large',
		null,
		array(
			'class' => $args['image_ratio'] . $args['radius'],
		)
	)
	?>
	<?php
endif;



// if ( imageObject ? . source_url ) {
// return (
// <>
// < img
// className = { `${ imageRatioClass } ${ radiusClass }` }
// style = { { '--capitola-objectPosition' : props . attributes . imageCropPosition } }
// src = { imageObject . source_url }
// alt = ''
// >
// { props . isSelected && ! props . attributes . externalImage && (
// < ImageSelectButton
// onSelect = { ( value ) => {
// props . setAttributes( { sideImage: { id: value . id, source_url: value . url } } );
// } }
// value = { props . attributes . sideImage . id }
// flexWrap = { true }
// >
// ) }
// < / >
// );
