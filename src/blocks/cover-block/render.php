<?php

use function Capitola\Helpers\Block_Attributes\parallax_img_class;
use function Capitola\Helpers\String_Helpers\render_link;

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
	$attributes['headline'] = get_the_title();
}

if ( ! $attributes['backgroundImage']['id'] && $attributes['isHeroVariation'] ) {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
	$attributes['backgroundImage']['id'] = get_post_thumbnail_id();
}

$capitola_cta_1 = render_link( $attributes['cta'], 'wp-block-capitola-cover-block__cta --cta --secondary' );
$capitola_cta_2 = render_link( $attributes['cta2'], 'wp-block-capitola-cover-block__cta --cta --tertiary' );

?>
<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull --theme-image-overlay ' . ( $attributes['isHeroVariation'] ? '--hero-height' : '' ),
		)
	)
);
?>
>
	<div class="wp-block-capitola-cover-block__image <?= esc_attr( parallax_img_class( ( $attributes['imageParallax'] ) ) ); ?>" style="--capitola-overlayOpacity: <?= esc_attr( $attributes['imageOpacity'] ); ?>; --capitola-objectPosition: <?= esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?php if ( $attributes['backgroundImage']['id'] ) : ?>
			<?= wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
		<?php endif; ?>
	</div>
	<div class="wp-block-capitola-cover-block__body --align-<?= esc_attr( $attributes['introAlign'] ); ?>">
		<?php if ( $attributes['eyebrow'] ) : ?>
			<<?= tag_escape( $attributes['eyebrowTag'] ); ?> class="wp-block-capitola-cover-block__eyebrow --eyebrow">
				<?= esc_html( $attributes['eyebrow'] ); ?>
			</<?= tag_escape( $attributes['eyebrowTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $attributes['headline'] ) : ?>
			<<?= tag_escape( $attributes['headlineTag'] ); ?> class="wp-block-capitola-cover-block__headline --hl-xxl">
				<?= esc_html( $attributes['headline'] ); ?>
			</<?= tag_escape( $attributes['headlineTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="wp-block-capitola-cover-block__caption">
				<?= wp_kses_post( $content ); ?>
			</div>
		<?php endif; ?>
		<?php if ( $capitola_cta_1 || $capitola_cta_2 ) : ?>
			<div class="wp-block-capitola-cover-block__ctas">
				<?= wp_kses_post( $capitola_cta_1 ); ?>
				<?= wp_kses_post( $capitola_cta_2 ); ?>
			</div>
		<?php endif; ?>
	</div>
</section>
