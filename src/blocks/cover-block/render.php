<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\img_scroll_animation_class;
use function Capitola\Helpers\String_Helpers\render_link;

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	$attributes['headline'] = get_the_title();
}

if ( ! $attributes['backgroundImage']['id'] && $attributes['isHeroVariation'] ) {
	$attributes['backgroundImage']['id'] = get_post_thumbnail_id();
}

$cta_1 = render_link( $attributes['cta'], 'wp-block-capitola-cover-block__cta --cta --secondary' );
$cta_2 = render_link( $attributes['cta2'], 'wp-block-capitola-cover-block__cta --cta --tertiary' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull --theme-image-overlay ' . ( $attributes['isHeroVariation'] ? '--hero-height' : '' ),
	)
);

?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-cover-block__image <?php echo esc_attr( img_scroll_animation_class( ( $attributes['imageScrollAnimation'] ) ) ); ?>" style="--wp--custom--overlay-opacity: <?php echo esc_attr( $attributes['imageOpacity'] ); ?>; --wp--custom--object-position: <?php echo esc_attr( $attributes['imageFocalPoint'] ); ?>;">
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
			<div class="wp-block-capitola-cover-block__intro">
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>
		<?php if ( $cta_1 || $cta_2 ) : ?>
			<div class="wp-block-capitola-cover-block__ctas">
				<?php echo $cta_1; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo $cta_2; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>
	</div>
</section>
