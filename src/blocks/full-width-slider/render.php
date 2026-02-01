<?php

$aspect_ratio = ' --' . $attributes['aspectRatio'];
$autoplay = $attributes['autoplay'] ? ' data-autoplay=1' : '';

$navigation = $attributes['navigation'] === 'thumbnails' || $attributes['navigation'] === 'arrows' ? 'arrows' : 'bullets';

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$radius_class = $attributes['sliderRadius'] !== 'none' ? ' --has-' . $attributes['sliderRadius'] . '-radius' : '';

$sticky_class = $attributes['stickySlider'] ? ' --sticky' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'js-fullWidthSlider alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-full-width-slider__width alignwide <?= esc_attr( $animations['block-class'] ) ?> --has-<?= esc_attr( $attributes['introAlign'] ) ?>-intro" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
		<div class="wp-block-cwps-full-width-slider__sliders <?= esc_attr( $sticky_class ) ?>">
			<div class="wp-block-cwps-full-width-slider__main">
				<div class="swiper <?= esc_attr( $radius_class ) ?> js-mainSlider <?= esc_attr( $animations['figure-class'] ) ?>" <?= wp_kses_data( $animations['figure-data'] ) ?>  <?= wp_kses_data( $autoplay ) ?> data-navigation="<?= esc_attr( $navigation ) ?>" data-transition="<?= esc_attr( $attributes['transition'] ) ?>">
					<div class="swiper-wrapper">
						<?php
						foreach ( $attributes['slides'] as $slide ) :
							$cta = \Capitola\Helpers\String_Helpers\render_link( $slide['link'], 'wp-block-cwps-full-width-slider__slide-cta --cta --tertiary' );
							?>
							<figure class="swiper-slide<?= esc_attr( $aspect_ratio ) ?> --theme-image-overlay">
								<?= wp_get_attachment_image( $slide['image']['id'], 'large' ) ?>
								<?php if ( $slide['caption'] || $cta ) : ?>
									<div class="wp-block-cwps-full-width-slider__slide-caption">
										<?php if ( $slide['caption'] || $cta ) : ?>
											<figcaption>
												<?php if ( $slide['caption'] ) : ?>
													<p><?= esc_html( $slide['caption'] ) ?></p>
												<?php endif; ?>
												<?= wp_kses_post( $cta ) ?>
											</figcaption>
										<?php endif; ?>
									</div>
								<?php endif; ?>
							</figure>
						<?php endforeach; ?>
					</div>
					<?php if ( $navigation === 'arrows' ) : ?>
						<button type="button" class="swiper-button-next" aria-label="Previous Slide"></button>
						<button type="button" class="swiper-button-prev" aria-label="Next Slide"></button>
					<?php endif; ?>
					<?php if ( $navigation === 'bullets' ) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
				</div>
				<?php if ( $attributes['navigation'] === 'thumbnails' ) : ?>
					<div class="wp-block-cwps-full-width-slider__thumbs">
						<div class="swiper js-sliderThumbs">
							<div class="swiper-wrapper">
								<?php foreach ( $attributes['slides'] as $slide ) : ?>
									<div class="swiper-slide">
										<?= wp_get_attachment_image( $slide['image']['id'], 'medium' ) ?>
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
