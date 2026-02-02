<?php

use function Capitola\Helpers\String_Helpers\render_link;

$capitola_navigation = 'thumbnails' === $attributes['navigation'] || 'arrows' === $attributes['navigation'] ? 'arrows' : 'bullets';

$capitola_animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$capitola_radius_class = 'none' !== $attributes['sliderRadius'] ? ' --has-' . $attributes['sliderRadius'] . '-radius' : '';

?>

<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'js-fullWidthSlider alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-full-width-slider__width alignwide <?= esc_attr( $capitola_animations['block-class'] ); ?> --has-<?= esc_attr( $attributes['introAlign'] ); ?>-intro" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-full-width-slider__sliders <?= esc_attr( $attributes['stickySlider'] ? ' --sticky' : '' ); ?>">
			<div class="wp-block-capitola-full-width-slider__main">
				<div class="swiper <?= esc_attr( $capitola_radius_class ); ?> js-mainSlider <?= esc_attr( $capitola_animations['figure-class'] ); ?>" <?= wp_kses_data( $capitola_animations['figure-data'] ); ?>  <?= wp_kses_data( $attributes['autoplay'] ? ' data-autoplay=1' : '' ); ?> data-navigation="<?= esc_attr( $capitola_navigation ); ?>" data-transition="<?= esc_attr( $attributes['transition'] ); ?>">
					<div class="swiper-wrapper">
						<?php
						foreach ( $attributes['slides'] as $capitola_slide ) :
							$capitola_cta = render_link( $capitola_slide['link'], 'wp-block-capitola-full-width-slider__slide-cta --cta --tertiary' );
							?>
							<figure class="swiper-slide<?= esc_attr( ' --' . $attributes['aspectRatio'] ); ?> --theme-image-overlay">
								<?= wp_get_attachment_image( $capitola_slide['image']['id'], 'large' ); ?>
								<?php if ( $capitola_slide['caption'] || $capitola_cta ) : ?>
									<div class="wp-block-capitola-full-width-slider__slide-caption">
										<?php if ( $capitola_slide['caption'] || $capitola_cta ) : ?>
											<figcaption>
												<?php if ( $capitola_slide['caption'] ) : ?>
													<p><?= esc_html( $capitola_slide['caption'] ); ?></p>
												<?php endif; ?>
												<?= wp_kses_post( $capitola_cta ); ?>
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
										<?= wp_get_attachment_image( $capitola_slide['image']['id'], 'medium' ); ?>
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
