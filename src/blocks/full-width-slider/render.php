<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$navigation = 'thumbnails' === $attributes['navigation'] || 'arrows' === $attributes['navigation'] ? 'arrows' : 'bullets';

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$radius_class = 'none' !== $attributes['sliderRadius'] ? ' --has-' . $attributes['sliderRadius'] . '-radius' : '';

?>

<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'js-fullWidthSlider alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-full-width-slider__width alignwide <?php echo esc_attr( $animations['block-class'] ); ?> --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro" <?php echo wp_kses_data( $animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-full-width-slider__sliders <?php echo esc_attr( $attributes['stickySlider'] ? ' --sticky' : '' ); ?>">
			<div class="wp-block-capitola-full-width-slider__main">
				<div class="swiper <?php echo esc_attr( $radius_class ); ?> js-mainSlider <?php echo esc_attr( $animations['figure-class'] ); ?>" <?php echo wp_kses_data( $animations['figure-data'] ); ?>  <?php echo wp_kses_data( $attributes['autoplay'] ? ' data-autoplay=1' : '' ); ?> data-navigation="<?php echo esc_attr( $navigation ); ?>" data-transition="<?php echo esc_attr( $attributes['transition'] ); ?>">
					<div class="swiper-wrapper">
						<?php
						foreach ( $attributes['slides'] as $slide ) :
							$cta = render_link( $slide['link'], 'wp-block-capitola-full-width-slider__slide-cta --cta --tertiary' );
							?>
							<figure class="swiper-slide<?php echo esc_attr( ' --' . $attributes['aspectRatio'] ); ?> --theme-image-overlay">
								<?php echo wp_get_attachment_image( $slide['image']['id'], 'large' ); ?>
								<?php if ( $slide['caption'] || $cta ) : ?>
									<div class="wp-block-capitola-full-width-slider__slide-caption">
										<?php if ( $slide['caption'] || $cta ) : ?>
											<figcaption>
												<?php if ( $slide['caption'] ) : ?>
													<p><?php echo esc_html( $slide['caption'] ); ?></p>
												<?php endif; ?>
												<?php echo wp_kses_post( $cta ); ?>
											</figcaption>
										<?php endif; ?>
									</div>
								<?php endif; ?>
							</figure>
						<?php endforeach; ?>
					</div>
					<?php if ( 'arrows' === $navigation ) : ?>
						<button type="button" class="swiper-button-next" aria-label="Previous Slide"></button>
						<button type="button" class="swiper-button-prev" aria-label="Next Slide"></button>
					<?php endif; ?>
					<?php if ( 'bullets' === $navigation ) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
				</div>
				<?php if ( 'thumbnails' === $attributes['navigation'] ) : ?>
					<div class="wp-block-capitola-full-width-slider__thumbs">
						<div class="swiper js-sliderThumbs">
							<div class="swiper-wrapper">
								<?php foreach ( $attributes['slides'] as $slide ) : ?>
									<div class="swiper-slide">
										<?php echo wp_get_attachment_image( $slide['image']['id'], 'medium' ); ?>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>
