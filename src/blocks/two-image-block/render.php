<?php

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-capitola-two-image-block__width alignwide --has-<?= esc_attr( $attributes['introAlign'] ) ?>-intro <?= esc_attr( $animations['block-class'] ) ?><?= ( $attributes['verticalAlign'] === 'top' ? ' --align-top' : '' ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
		<div class="wp-block-capitola-two-image-block__imagecol --aspect-ratio-<?= esc_attr( $attributes['gridAspectRatio'] ) ?> <?= esc_attr( $animations['figure-class'] ) ?> --rear-position-<?= esc_attr( $attributes['rearImagePosition'] ) ?>" <?= wp_kses_data( $animations['figure-data'] ) ?>>
			<figure class="wp-block-capitola-two-image-block__rear-image <?= $attributes['rearImageRadius'] ? ' --has-' . esc_attr( $attributes['rearImageRadius'] ) . '-radius' : '' ?>" style=" --image-height: <?= esc_attr( $attributes['rearImageHeight'] ) ?>; --image-width:<?= esc_attr( $attributes['rearImageWidth'] ) ?>; --capitola-objectPosition:<?= esc_attr( $attributes['rearImageCropPosition'] ) ?>;">
				<?= wp_get_attachment_image( $attributes['rearImage']['id'], 'large' ) ?>
			</figure>
			<figure class="wp-block-capitola-two-image-block__front-image <?= $attributes['frontImageRadius'] ? ' --has-' . esc_attr( $attributes['frontImageRadius'] . '-radius' ) : '' ?>" style=" --image-height: <?= esc_attr( $attributes['frontImageHeight'] ) ?>; --image-width: <?= esc_attr( $attributes['frontImageWidth'] ) ?>; --capitola-objectPosition:<?= esc_attr( $attributes['frontImageCropPosition'] ) ?>">
				<?= wp_get_attachment_image( $attributes['frontImage']['id'], 'large' ) ?>
			</figure>
		</div>
	</div>
</section>
