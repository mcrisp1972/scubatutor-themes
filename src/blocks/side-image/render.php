<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\Block_Attributes\parallax_img_class;

$capitola_class = ' --has-' . $attributes['introAlign'] . '-intro';

if ( 'full' === $attributes['imageLayout'] ) {
	$capitola_class .= ' --side-bg-img';
} else {
	$capitola_class .= ' --inset-img';
}

if ( ! $attributes['sideImage']['id'] && $attributes['isHeroVariation'] ) {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
	$attributes['sideImage']['id'] = get_post_thumbnail_id();
}

$capitola_animations = animation_attributes( $attributes, 'full' === $attributes['imageLayout'] );

$capitola_parallax_class = parallax_img_class( ( $attributes['imageParallax'] && 'full' === $attributes['imageLayout'] ) );

$capitola_sticky_class = $attributes['stickyImage'] && 'inner' === $attributes['imageLayout'] && 'top' === $attributes['verticalAlign'] ? ' --sticky' : '';

if ( 'inner' === $attributes['imageLayout'] && $attributes['showCaption'] ) {
	if ( $attributes['imageCaption'] ) {
		$capitola_caption = $attributes['imageCaption'];
	} elseif ( $attributes['sideImage']['id'] ) {
		$capitola_caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
	}
} else {
	$capitola_caption = '';
}

?>

<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( $capitola_animations['block-class'] || $capitola_animations['body-class'] || $capitola_animations['figure-class'] ? ' --has-animation' : '' ),
		)
	)
);
?>
>
	<div class="wp-block-capitola-side-image__width <?= 'inner' === $attributes['imageLayout'] ? 'alignwide' : 'alignfull'; ?> <?= esc_attr( $capitola_class ); ?><?= esc_attr( $capitola_animations['block-class'] ); ?><?= ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<div class="wp-block-capitola-side-image__imagewrap <?= esc_attr( $capitola_sticky_class . ' ' . $capitola_parallax_class ); ?>" style="--capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ); ?>;">
			<?php if ( 'inner' === $attributes['imageLayout'] ) : ?>
				<figure class="wp-block-capitola-side-image__imageratio <?= esc_attr( $capitola_animations['figure-class'] ); ?>" <?= wp_kses_data( $capitola_animations['figure-data'] ); ?>>
			<?php endif; ?>
			<?php
			get_template_part(
				'build/blocks/side-image/template-parts/' . $attributes['mediaType'],
				'',
				array(
					'attributes' => $attributes,
					'image_ratio' => 'inner' === $attributes['imageLayout'] && ! $attributes['isIframeVariation'] && ! $attributes['isVideoVariation'] ? '--' . $attributes['imageRatio'] : '',
					'radius' => 'inner' === $attributes['imageLayout'] && $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '',
				)
			);
			?>
			<?php if ( $capitola_caption ) : ?>
				<figcaption>
					<?= esc_html( $capitola_caption ); ?>
				</figcaption>
			<?php endif; ?>
			<?php if ( 'inner' === $attributes['imageLayout'] ) : ?>
				</figure>
			<?php endif; ?>
		</div>
		<?= wp_kses_post( $content ); ?>
	</div>
</section>
