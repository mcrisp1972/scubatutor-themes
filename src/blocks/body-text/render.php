<?php

$animations = \cwps\helpers\blockAttributes\animation_attributes( $block->context );

$image_bg_class = $attributes['backgroundImage']['id'] ? ' --has-bg-image --theme-image-overlay' : '';

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	$attributes['headline'] = get_the_title();
}

$intro_position_class = ' --is-' . $block->context['introAlign'] . '-intro';

$intro_align_class = $block->context['introAlign'] === 'top' && $attributes['textAlign'] === 'center' ? ' --is-centered-intro' : '';

$justify_class = $attributes['verticalAlign'] === 'top' ? ' --justify-top' : '';

$parallax_class = \cwps\helpers\blockAttributes\parallax_img_class( ( $attributes['imageParallax'] ) );

if ( ! $attributes['eyebrow'] && ! $attributes['headline'] && ! $content && ! $attributes['cta'] && ! $attributes['cta2'] ) {
	return;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $intro_position_class . $intro_align_class . $image_bg_class . $justify_class,
	)
);

$cta_1 = \cwps\helpers\stringHelpers\render_link( $attributes['cta'], 'wp-block-cwps-body-text__cta --cta' . ( $attributes['backgroundImage']['id'] ? ' --secondary' : '' ) );

$cta_2 = \cwps\helpers\stringHelpers\render_link( $attributes['cta2'], 'wp-block-cwps-body-text__cta --cta' . ( $attributes['backgroundImage']['id'] ? ' --tertiary' : ' --secondary' ) );

?>

<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?php if ( $attributes['backgroundImage']['id'] ) : ?>
		<div class="wp-block-cwps-body-text__bg-image <?= esc_attr( $parallax_class ) ?>" style="--cwps-overlayOpacity: <?= esc_attr( $attributes['imageOpacity'] ) ?>; --cwps-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ) ?>;">
			<?= wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ) ?>
		</div>
	<?php endif; ?>
	<div class="wp-block-cwps-body-text__grid <?= esc_attr( $animations['body-class'] ) ?>" <?= wp_kses_data( $animations['body-data'] ) ?>>
		<?php if ( $attributes['eyebrow'] ) : ?>
			<div class="wp-block-cwps-body-text__eyebrow --eyebrow">
				<?= esc_html( $attributes['eyebrow'] ) ?>
			</div>
		<?php endif; ?>
		<?php if ( $attributes['headline'] ) : ?>
			<<?= tag_escape( $attributes['headlineTag'] ) ?> class="wp-block-cwps-body-text__headline --hl-l">
				<?= esc_html( $attributes['headline'] ) ?>
			</<?= tag_escape( $attributes['headlineTag'] ) ?>>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="wp-block-cwps-body-text__intro">
				<?= wp_kses_post( $content ) ?>
			</div>
		<?php endif; ?>
		<?php if ( $cta_1 || $cta_2 ) : ?>
			<div class="wp-block-cwps-body-text__ctas">
				<?= wp_kses_post( $cta_1 ) ?>
				<?= wp_kses_post( $cta_2 ) ?>
			</div>
		<?php endif; ?>
	</div>
</div>
