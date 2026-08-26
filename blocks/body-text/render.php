<?php

namespace Capitola\Blocks\Body_Text;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\String_Helpers\render_link;
use function Capitola\Helpers\Block_Attributes\img_scroll_animation_class;

$animations = animation_attributes( $block->context );

$bg_class = $attributes['backgroundImage']['id'] ? ' --has-bg-image --theme-image-overlay' : '';

if ( ! $attributes['headline'] && $attributes['isHeroVariation'] ) {
	$attributes['headline'] = get_the_title();
}

$intro_position_class = ' --is-' . $block->context['capitola/introAlign'] . '-intro';

$intro_align_class = 'top' === $block->context['capitola/introAlign'] && 'center' === $attributes['textAlign'] ? ' --is-centered-intro' : '';

$justify_class = 'top' === $attributes['verticalAlign'] ? ' --justify-top' : '';

if ( ! $attributes['eyebrow'] && ! $attributes['headline'] && ! $content && ! $attributes['cta'] && ! $attributes['cta2'] ) {
	return;
}

$cta_1 = render_link( $attributes['cta'], 'wp-block-capitola-body-text__cta --cta' . ( $attributes['backgroundImage']['id'] ? ' --secondary' : '' ) );

$cta_2 = render_link( $attributes['cta2'], 'wp-block-capitola-body-text__cta --cta' . ( $attributes['backgroundImage']['id'] ? ' --tertiary' : ' --secondary' ) );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $intro_position_class . $intro_align_class . $bg_class . $justify_class,
	),
);

?>

<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php if ( $attributes['backgroundImage']['id'] ) : ?>
		<div class="wp-block-capitola-body-text__bg-image <?php echo esc_attr( img_scroll_animation_class( ( $attributes['imageScrollAnimation'] ) ) ); ?>" style="--capitola-overlayOpacity: <?php echo esc_attr( $attributes['imageOpacity'] ); ?>; --capitola-objectPosition: <?php echo esc_attr( $attributes['imageFocalPoint'] ); ?>;">
			<?php echo wp_get_attachment_image( $attributes['backgroundImage']['id'], 'large' ); ?>
		</div>
	<?php endif; ?>
	<div
		class="wp-block-capitola-body-text__grid <?php echo esc_attr( $animations['body-class'] ); ?>"
		style="
			<?php
			echo esc_attr(
				( 'none' !== $attributes['borderRadius'] ? 'border-radius: var(--wp--preset--border-radius--' . esc_attr( $attributes['borderRadius'] ) . ')' : '' ) .
				$animations['body-styles']
			);
			?>
		"
	>
		<?php if ( $attributes['eyebrow'] ) : ?>
			<<?php echo tag_escape( $attributes['eyebrowTag'] ); ?> class="wp-block-capitola-body-text__eyebrow --eyebrow">
				<?php echo esc_html( $attributes['eyebrow'] ); ?>
			</<?php echo tag_escape( $attributes['eyebrowTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $attributes['headline'] ) : ?>
			<<?php echo tag_escape( $attributes['headlineTag'] ); ?> class="wp-block-capitola-body-text__headline --hl-l">
				<?php echo esc_html( $attributes['headline'] ); ?>
			</<?php echo tag_escape( $attributes['headlineTag'] ); ?>>
		<?php endif; ?>
		<?php if ( $content ) : ?>
			<div class="wp-block-capitola-body-text__intro">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		<?php endif; ?>
		<?php if ( $cta_1 || $cta_2 ) : ?>
			<div class="wp-block-capitola-body-text__ctas">
				<?php echo wp_kses_post( $cta_1 ); ?>
				<?php echo wp_kses_post( $cta_2 ); ?>
			</div>
		<?php endif; ?>
	</div>
</div>

