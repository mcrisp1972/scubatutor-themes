<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-small-image-slider__width alignfull is-layout-constrained has-global-padding <?php echo esc_attr( $animations['block-class'] ); ?>" style="<?php echo wp_kses_data( $animations['block-styles'] ); ?>">
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-small-image-slider__slider-parent">
			<div class="wp-block-capitola-small-image-slider__swiper swiper<?php echo ( 'square' === $attributes['aspectRatio'] ? ' --square' : ' --landscape' ); ?>"<?php echo ( $attributes['autoplay'] ? ' data-autoplay="1"' : '' ); ?>>
				<ul
					class="wp-block-capitola-small-image-slider__swiper-wrapper swiper-wrapper <?php echo $attributes['grayscaleInactive'] ? ' --grayscale-inactive' : ''; ?>"
					role="region"
					aria-roledescription="carousel"
				>
					<?php
					$total_slides = count( $attributes['slides'] );
					foreach ( $attributes['slides'] as $key => $slide ) :
						$current = $key + 1;
						?>
						<li
							class="wp-block-capitola-small-image-slider__swiper-slide swiper-slide"
							data-caption="<?php echo esc_attr( $slide['caption'] ); ?>"
							role="group"
							aria-roledescription="slide"
							aria-label="<?php echo esc_attr( $current ); ?> of <?php echo esc_attr( $total_slides ); ?>" >
							<?php echo wp_get_attachment_image( $slide['image']['id'], 'large' ); ?>
						</li>
					<?php endforeach; ?>
				</ul>
				<div class="wp-block-capitola-small-image-slider__nav-buttons">
					<button class="swiper-button-next" aria-label="Next Slide"></button>
					<button class="swiper-button-prev" aria-label="Previous Slide"></button>
				</div>
			</div>
			<p class="wp-block-capitola-small-image-slider__caption" role="status">
				<?php echo esc_html( $attributes['slides'][0]['caption'] ); ?>
			</p>
		</div>
	</div>
</section>
