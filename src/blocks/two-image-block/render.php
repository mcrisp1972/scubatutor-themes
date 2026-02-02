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
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-two-image-block__width alignwide --has-<?= esc_attr( $attributes['introAlign'] ); ?>-intro <?= esc_attr( $capitola_animations['block-class'] ); ?><?= ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-two-image-block__imagecol --aspect-ratio-<?= esc_attr( $attributes['gridAspectRatio'] ); ?> <?= esc_attr( $capitola_animations['figure-class'] ); ?> --rear-position-<?= esc_attr( $attributes['rearImagePosition'] ); ?>" <?= wp_kses_data( $capitola_animations['figure-data'] ); ?>>
			<figure class="wp-block-capitola-two-image-block__rear-image <?= $attributes['rearImageRadius'] ? ' --has-' . esc_attr( $attributes['rearImageRadius'] ) . '-radius' : ''; ?>" style=" --image-height: <?= esc_attr( $attributes['rearImageHeight'] ); ?>; --image-width:<?= esc_attr( $attributes['rearImageWidth'] ); ?>; --capitola-objectPosition:<?= esc_attr( $attributes['rearImageCropPosition'] ); ?>;">
				<?= wp_get_attachment_image( $attributes['rearImage']['id'], 'large' ); ?>
			</figure>
			<figure class="wp-block-capitola-two-image-block__front-image <?= $attributes['frontImageRadius'] ? ' --has-' . esc_attr( $attributes['frontImageRadius'] . '-radius' ) : ''; ?>" style=" --image-height: <?= esc_attr( $attributes['frontImageHeight'] ); ?>; --image-width: <?= esc_attr( $attributes['frontImageWidth'] ); ?>; --capitola-objectPosition:<?= esc_attr( $attributes['frontImageCropPosition'] ); ?>">
				<?= wp_get_attachment_image( $attributes['frontImage']['id'], 'large' ); ?>
			</figure>
		</div>
	</div>
</section>
