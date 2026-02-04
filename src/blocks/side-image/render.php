<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\Block_Attributes\parallax_img_class;

$class = ' --has-' . $attributes['introAlign'] . '-intro';

if ( 'full' === $attributes['imageLayout'] ) {
	$class .= ' --side-bg-img';
} else {
	$class .= ' --inset-img';
}

if ( ! $attributes['sideImage']['id'] && $attributes['isHeroVariation'] ) {
	$attributes['sideImage']['id'] = get_post_thumbnail_id();
}

$animations = animation_attributes( $attributes, 'full' === $attributes['imageLayout'] );

$parallax_class = parallax_img_class( ( $attributes['imageParallax'] && 'full' === $attributes['imageLayout'] ) );

$sticky_class = $attributes['stickyImage'] && 'inner' === $attributes['imageLayout'] && 'top' === $attributes['verticalAlign'] ? ' --sticky' : '';

if ( 'inner' === $attributes['imageLayout'] && $attributes['showCaption'] ) {
	if ( $attributes['imageCaption'] ) {
		$caption = $attributes['imageCaption'];
	} elseif ( $attributes['sideImage']['id'] ) {
		$caption = wp_get_attachment_caption( $attributes['sideImage']['id'] );
	}
} else {
	$caption = '';
}

?>

<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( $animations['block-class'] || $animations['body-class'] || $animations['figure-class'] ? ' --has-animation' : '' ),
		)
	)
);
?>
>
	<div class="wp-block-capitola-side-image__width <?php echo 'inner' === $attributes['imageLayout'] ? 'alignwide' : 'alignfull'; ?> <?php echo esc_attr( $class ); ?><?php echo esc_attr( $animations['block-class'] ); ?><?php echo ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" <?php echo wp_kses_data( $animations['block-data'] ); ?>>
		<div class="wp-block-capitola-side-image__imagewrap <?php echo esc_attr( $sticky_class . ' ' . $parallax_class ); ?>" style="--capitola-objectPosition: <?php echo esc_attr( $attributes['imageCropPosition'] ); ?>;">
			<?php if ( 'inner' === $attributes['imageLayout'] ) : ?>
				<figure class="wp-block-capitola-side-image__imageratio <?php echo esc_attr( $animations['figure-class'] ); ?>" <?php echo wp_kses_data( $animations['figure-data'] ); ?>>
			<?php endif; ?>
			<?php
			get_template_part(
				'build/blocks/side-image/template-parts/' . $attributes['mediaType'],
				'',
				array(
					'attributes'  => $attributes,
					'image_ratio' => 'inner' === $attributes['imageLayout'] && ! $attributes['isIframeVariation'] && ! $attributes['isVideoVariation'] ? '--' . $attributes['imageRatio'] : '',
					'radius'      => 'inner' === $attributes['imageLayout'] && $attributes['imageRadius'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '',
				)
			);
			?>
			<?php if ( $caption ) : ?>
				<figcaption>
					<?php echo esc_html( $caption ); ?>
				</figcaption>
			<?php endif; ?>
			<?php if ( 'inner' === $attributes['imageLayout'] ) : ?>
				</figure>
			<?php endif; ?>
		</div>
		<?php echo wp_kses_post( $content ); ?>
	</div>
</section>
