<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\parallax_img_class;
use function Capitola\Helpers\String_Helpers\render_link;

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	$attributes['headline'] = get_the_title();
}

if ( ! $attributes['backgroundImage']['id'] && $attributes['isHeroVariation'] ) {
	$attributes['backgroundImage']['id'] = get_post_thumbnail_id();
}

$cta_1 = render_link( $attributes['cta'], 'wp-block-capitola-cover-block__cta --cta --secondary' );
$cta_2 = render_link( $attributes['cta2'], 'wp-block-capitola-cover-block__cta --cta --tertiary' );

?>
<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'alignfull --theme-image-overlay ' . ( $attributes['isHeroVariation'] ? '--hero-height' : '' ),
		)
	)
);
?>
>
	<div class="wp-block-capitola-cover-block__image <?php echo esc_attr( parallax_img_class( ( $attributes['imageParallax'] ) ) ); ?>" style="--capitola-overlayOpacity: <?php echo esc_attr( $attributes['imageOpacity'] ); ?>; --capitola-objectPosition: <?php echo esc_attr( $attributes['imageCropPosition'] ); ?>;">
		<?php if ( $attributes['backgroundImage']['id'] ) : ?>
			<?php echo wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
		<?php endif; ?>
	</div>
	<div class="wp-block-capitola-cover-block__body --align-<?php echo esc_attr( $attributes['introAlign'] ); ?>">
		<?php if ( $attributes['eyebrow'] ) : ?>
			<<?php echo tag_escape( $attributes['eyebrowTag'] ); ?> class="wp-block-capitola-cover-block__eyebrow --eyebrow">
				<?php echo esc_html( $attributes['eyebrow'] ); ?>
			</<?php echo tag_escape( $attributes['eyebrowTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $attributes['headline'] ) : ?>
			<<?php echo tag_escape( $attributes['headlineTag'] ); ?> class="wp-block-capitola-cover-block__headline --hl-xxl">
				<?php echo esc_html( $attributes['headline'] ); ?>
			</<?php echo tag_escape( $attributes['headlineTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="wp-block-capitola-cover-block__caption">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		<?php endif; ?>
		<?php if ( $cta_1 || $cta_2 ) : ?>
			<div class="wp-block-capitola-cover-block__ctas">
				<?php echo wp_kses_post( $cta_1 ); ?>
				<?php echo wp_kses_post( $cta_2 ); ?>
			</div>
		<?php endif; ?>
	</div>
</section>
