<?php

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	$attributes['headline'] = get_the_title();
}

if ( ! $attributes['backgroundImage']['id'] && $attributes['isHeroVariation'] ) {
	$attributes['backgroundImage']['id'] = get_post_thumbnail_id();
}

$hero_class = $attributes['isHeroVariation'] ? '--hero-height' : '';
$parallax_class = \cwps\helpers\blockAttributes\parallax_img_class( ( $attributes['imageParallax'] ) );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull --theme-image-overlay ' . $hero_class,
	)
);

$cta_1 = \cwps\helpers\stringHelpers\render_link( $attributes['cta'], 'wp-block-cwps-cover-block__cta --cta --secondary' );

$cta_2 = \cwps\helpers\stringHelpers\render_link( $attributes['cta2'], 'wp-block-cwps-cover-block__cta --cta --tertiary' );

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-cover-block__image <?= esc_attr( $parallax_class ) ?>" style="--capitola-overlayOpacity: <?= esc_attr( $attributes['imageOpacity'] ) ?>; --capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ) ?>;">
		<?php if ( $attributes['backgroundImage']['id'] ) : ?>
			<?= wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ) ?>
		<?php endif; ?>
	</div>
	<div class="wp-block-cwps-cover-block__body --align-<?= esc_attr( $attributes['introAlign'] ) ?>">
		<?php if ( $attributes['eyebrow'] ) : ?>
			<<?= tag_escape( $attributes['eyebrowTag'] ) ?> class="wp-block-cwps-cover-block__eyebrow --eyebrow">
				<?= esc_html( $attributes['eyebrow'] ) ?>
			</<?= tag_escape( $attributes['eyebrowTag'] ) ?>>
		<?php endif; ?>
		<?php if ( $attributes['headline'] ) : ?>
			<<?= tag_escape( $attributes['headlineTag'] ) ?> class="wp-block-cwps-cover-block__headline --hl-xxl">
				<?= esc_html( $attributes['headline'] ) ?>
			</<?= tag_escape( $attributes['headlineTag'] ) ?>>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="wp-block-cwps-cover-block__caption">
				<?= wp_kses_post( $content ) ?>
			</div>
		<?php endif; ?>
		<?php if ( $cta_1 || $cta_2 ) : ?>
			<div class="wp-block-cwps-cover-block__ctas">
				<?= wp_kses_post( $cta_1 ) ?>
				<?= wp_kses_post( $cta_2 ) ?>
			</div>
		<?php endif; ?>
	</div>
</section>
