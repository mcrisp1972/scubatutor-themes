<?php

$class = ' --has-' . $attributes['introAlign'] . '-intro';

if ( $attributes['imageLayout'] === 'full' ) {
	$class .= ' --side-bg-img';
} else {
	$class .= ' --inset-img';
}

if ( ! $attributes['sideImage']['id'] && $attributes['isHeroVariation'] ) {
	$attributes['sideImage']['id'] = get_post_thumbnail_id();
}

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes, $attributes['imageLayout'] === 'full' );

$parallax_class = \Capitola\Helpers\Block_Attributes\parallax_img_class( ( $attributes['imageParallax'] && $attributes['imageLayout'] === 'full' ) );

$sticky_class = $attributes['stickyImage'] && $attributes['imageLayout'] === 'inner' && $attributes['verticalAlign'] === 'top' ? ' --sticky' : '';

if ( $attributes['imageLayout'] === 'inner' && $attributes['showCaption'] ) {
	if ( $attributes['imageCaption'] ) {
		$caption = $attributes['imageCaption'];
	} elseif ( $attributes['sideImage']['id'] ) {
		$caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
	}
} else {
	$caption = '';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( $animations['block-class'] || $animations['body-class'] || $animations['figure-class'] ? ' --has-animation' : '' ),
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-side-image__width <?= $attributes['imageLayout'] === 'inner' ? 'alignwide' : 'alignfull' ?> <?= esc_attr( $class ) ?><?= esc_attr( $animations['block-class'] ) ?><?= ( $attributes['verticalAlign'] === 'top' ? ' --align-top' : '' ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<div class="wp-block-cwps-side-image__imagewrap <?= esc_attr( $sticky_class ) ?> <?= esc_attr( $parallax_class ) ?>" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ) ?>;">
			<?php if ( $attributes['imageLayout'] === 'inner' ) : ?>
				<figure class="wp-block-cwps-side-image__imageratio <?= esc_attr( $animations['figure-class'] ) ?>" <?= wp_kses_data( $animations['figure-data'] ) ?>>
			<?php endif; ?>
			<?php
			get_template_part(
				'build/blocks/side-image/template-parts/' . $attributes['mediaType'],
				'',
				array(
					'attributes' => $attributes,
					'image_ratio' => $attributes['imageLayout'] === 'inner' && ! $attributes['isIframeVariation'] && ! $attributes['isVideoVariation'] ? '--' . $attributes['imageRatio'] : '',
					'radius' => $attributes['imageLayout'] === 'inner' && $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '',
				)
			);
			?>
			<?php if ( $caption ) : ?>
				<figcaption>
					<?= esc_html( $caption ) ?>
				</figcaption>
			<?php endif; ?>
			<?php if ( $attributes['imageLayout'] === 'inner' ) : ?>
				</figure>
			<?php endif; ?>
		</div>
		<?= wp_kses_post( $content ) ?>
	</div>
</section>
