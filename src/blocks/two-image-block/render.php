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
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-two-image-block__width alignwide --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro <?php echo esc_attr( $capitola_animations['block-class'] ); ?><?php echo ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" <?php echo wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-two-image-block__imagecol --aspect-ratio-<?php echo esc_attr( $attributes['gridAspectRatio'] ); ?> <?php echo esc_attr( $capitola_animations['figure-class'] ); ?> --rear-position-<?php echo esc_attr( $attributes['rearImagePosition'] ); ?>" <?php echo wp_kses_data( $capitola_animations['figure-data'] ); ?>>
			<figure class="wp-block-capitola-two-image-block__rear-image <?php echo $attributes['rearImageRadius'] ? ' --has-' . esc_attr( $attributes['rearImageRadius'] ) . '-radius' : ''; ?>" style=" --image-height: <?php echo esc_attr( $attributes['rearImageHeight'] ); ?>; --image-width:<?php echo esc_attr( $attributes['rearImageWidth'] ); ?>; --capitola-objectPosition:<?php echo esc_attr( $attributes['rearImageCropPosition'] ); ?>;">
				<?php echo wp_get_attachment_image( $attributes['rearImage']['id'], 'large' ); ?>
			</figure>
			<figure class="wp-block-capitola-two-image-block__front-image <?php echo $attributes['frontImageRadius'] ? ' --has-' . esc_attr( $attributes['frontImageRadius'] . '-radius' ) : ''; ?>" style=" --image-height: <?php echo esc_attr( $attributes['frontImageHeight'] ); ?>; --image-width: <?php echo esc_attr( $attributes['frontImageWidth'] ); ?>; --capitola-objectPosition:<?php echo esc_attr( $attributes['frontImageCropPosition'] ); ?>">
				<?php echo wp_get_attachment_image( $attributes['frontImage']['id'], 'large' ); ?>
			</figure>
		</div>
	</div>
</section>
