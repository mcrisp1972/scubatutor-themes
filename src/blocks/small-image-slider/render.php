<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $attributes );

?>

<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => 'alignfull --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-small-image-slider__width alignfull is-layout-constrained has-global-padding <?php echo esc_attr( $capitola_animations['block-class'] ); ?>" <?php echo wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-small-image-slider__slider-parent">
			<div class="wp-block-capitola-small-image-slider__swiper swiper<?php echo ( 'square' === $attributes['aspectRatio'] ? ' --square' : ' --landscape' ); ?>"<?php echo ( $attributes['autoplay'] ? ' data-autoplay="1"' : '' ); ?>>
				<div class="wp-block-capitola-small-image-slider__swiper-wrapper swiper-wrapper <?php echo $attributes['grayscaleInactive'] ? ' --grayscale-inactive' : ''; ?>">
					<?php foreach ( $attributes['slides'] as $capitola_slide ) : ?>
						<figure class="wp-block-capitola-small-image-slider__swiper-slide swiper-slide" data-caption="<?php echo esc_attr( $capitola_slide['caption'] ); ?>">
							<?php echo wp_get_attachment_image( $capitola_slide['image']['id'], 'large' ); ?>
						</figure>
					<?php endforeach; ?>
				</div>
				<div class="wp-block-capitola-small-image-slider__nav-buttons">
					<button class="swiper-button-next"></button>
					<button class="swiper-button-prev"></button>
				</div>
			</div>
			<p class="wp-block-capitola-small-image-slider__caption">
				<?php echo esc_html( $attributes['slides'][0]['caption'] ); ?>
			</p>
		</div>
	</div>
</section>
