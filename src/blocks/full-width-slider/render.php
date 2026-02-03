<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$capitola_navigation = 'thumbnails' === $attributes['navigation'] || 'arrows' === $attributes['navigation'] ? 'arrows' : 'bullets';

$capitola_animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$capitola_radius_class = 'none' !== $attributes['sliderRadius'] ? ' --has-' . $attributes['sliderRadius'] . '-radius' : '';

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
	<div class="wp-block-capitola-full-width-slider__width alignwide <?php echo esc_attr( $capitola_animations['block-class'] ); ?> --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro" <?php echo wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-full-width-slider__sliders <?php echo esc_attr( $attributes['stickySlider'] ? ' --sticky' : '' ); ?>">
			<div class="wp-block-capitola-full-width-slider__main">
				<div class="swiper <?php echo esc_attr( $capitola_radius_class ); ?> js-mainSlider <?php echo esc_attr( $capitola_animations['figure-class'] ); ?>" <?php echo wp_kses_data( $capitola_animations['figure-data'] ); ?>  <?php echo wp_kses_data( $attributes['autoplay'] ? ' data-autoplay=1' : '' ); ?> data-navigation="<?php echo esc_attr( $capitola_navigation ); ?>" data-transition="<?php echo esc_attr( $attributes['transition'] ); ?>">
					<div class="swiper-wrapper">
						<?php
						foreach ( $attributes['slides'] as $capitola_slide ) :
							$capitola_cta = render_link( $capitola_slide['link'], 'wp-block-capitola-full-width-slider__slide-cta --cta --tertiary' );
							?>
							<figure class="swiper-slide<?php echo esc_attr( ' --' . $attributes['aspectRatio'] ); ?> --theme-image-overlay">
								<?php echo wp_get_attachment_image( $capitola_slide['image']['id'], 'large' ); ?>
								<?php if ( $capitola_slide['caption'] || $capitola_cta ) : ?>
									<div class="wp-block-capitola-full-width-slider__slide-caption">
										<?php if ( $capitola_slide['caption'] || $capitola_cta ) : ?>
											<figcaption>
												<?php if ( $capitola_slide['caption'] ) : ?>
													<p><?php echo esc_html( $capitola_slide['caption'] ); ?></p>
												<?php endif; ?>
												<?php echo wp_kses_post( $capitola_cta ); ?>
											</figcaption>
										<?php endif; ?>
									</div>
								<?php endif; ?>
							</figure>
						<?php endforeach; ?>
					</div>
					<?php if ( 'arrows' === $capitola_navigation ) : ?>
						<button type="button" class="swiper-button-next" aria-label="Previous Slide"></button>
						<button type="button" class="swiper-button-prev" aria-label="Next Slide"></button>
					<?php endif; ?>
					<?php if ( 'bullets' === $capitola_navigation ) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
				</div>
				<?php if ( 'thumbnails' === $attributes['navigation'] ) : ?>
					<div class="wp-block-capitola-full-width-slider__thumbs">
						<div class="swiper js-sliderThumbs">
							<div class="swiper-wrapper">
								<?php foreach ( $attributes['slides'] as $capitola_slide ) : ?>
									<div class="swiper-slide">
										<?php echo wp_get_attachment_image( $capitola_slide['image']['id'], 'medium' ); ?>
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
