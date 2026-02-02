<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $attributes );

?>

<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-small-image-slider__width alignfull is-layout-constrained has-global-padding <?= esc_attr( $capitola_animations['block-class'] ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-small-image-slider__slider-parent">
			<div class="wp-block-capitola-small-image-slider__swiper swiper<?= ( 'square' === $attributes['aspectRatio'] ? ' --square' : ' --landscape' ); ?>"<?= ( $attributes['autoplay'] ? ' data-autoplay="1"' : '' ); ?>>
				<div class="wp-block-capitola-small-image-slider__swiper-wrapper swiper-wrapper <?= $attributes['grayscaleInactive'] ? ' --grayscale-inactive' : ''; ?>">
					<?php foreach ( $attributes['slides'] as $capitola_slide ) : ?>
						<figure class="wp-block-capitola-small-image-slider__swiper-slide swiper-slide" data-caption="<?= esc_attr( $capitola_slide['caption'] ); ?>">
							<?= wp_get_attachment_image( $capitola_slide['image']['id'], 'large' ); ?>
						</figure>
					<?php endforeach; ?>
				</div>
				<div class="wp-block-capitola-small-image-slider__nav-buttons">
					<button class="swiper-button-next"></button>
					<button class="swiper-button-prev"></button>
				</div>
			</div>
			<p class="wp-block-capitola-small-image-slider__caption">
				<?= esc_html( $attributes['slides'][0]['caption'] ); ?>
			</p>
		</div>
	</div>
</section>
