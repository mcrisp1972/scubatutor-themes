<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-three-image-block__width alignwide --has-<?php echo esc_attr( $attributes['introAlign'] ); ?>-intro <?php echo esc_attr( $animations['block-class'] ); ?><?php echo ( 'top' === $attributes['verticalAlign'] ? ' --align-top' : '' ); ?>" style="<?php echo wp_kses_data( $animations['block-styles'] ); ?>">
		<?php echo wp_kses_post( $content ); ?>
		<div class="wp-block-capitola-three-image-block__imagecol --aspect-ratio-<?php echo esc_attr( $attributes['gridAspectRatio'] ); ?> <?php echo esc_attr( $animations['figure-class'] ); ?> --rear-position-<?php echo esc_attr( $attributes['rearImagePosition'] ); ?>" style="--capitola-flex-basis: <?php echo esc_attr( $attributes['mediaWidth'] ); ?>%; <?php echo wp_kses_data( $animations['figure-styles'] ); ?>">
			<figure class="wp-block-capitola-three-image-block__rear-image <?php echo $attributes['rearImageRadius'] ? ' --has-' . esc_attr( $attributes['rearImageRadius'] ) . '-radius' : ''; ?>" style=" --image-height: <?php echo esc_attr( $attributes['rearImageHeight'] ); ?>; --image-width:<?php echo esc_attr( $attributes['rearImageWidth'] ); ?>; --capitola-objectPosition:<?php echo esc_attr( $attributes['rearImageFocalPoint'] ); ?>;">
				<?php echo wp_get_attachment_image( $attributes['rearImage']['id'], 'large' ); ?>
			</figure>
			<figure class="wp-block-capitola-three-image-block__middle-image <?php echo $attributes['middleImageRadius'] ? ' --has-' . esc_attr( $attributes['middleImageRadius'] ) . '-radius' : ''; ?>" style=" --image-top-pos: <?php echo esc_attr( $attributes['middleImageTopPos'] ); ?>; --image-left-pos: <?php echo esc_attr( $attributes['middleImageLeftPos'] ); ?>; --image-height: <?php echo esc_attr( $attributes['middleImageHeight'] ); ?>; --image-width:<?php echo esc_attr( $attributes['middleImageWidth'] ); ?>; --capitola-objectPosition:<?php echo esc_attr( $attributes['middleImageFocalPoint'] ); ?>;">
				<?php echo wp_get_attachment_image( $attributes['middleImage']['id'], 'large' ); ?>
			</figure>
			<figure class="wp-block-capitola-three-image-block__front-image <?php echo $attributes['frontImageRadius'] ? ' --has-' . esc_attr( $attributes['frontImageRadius'] . '-radius' ) : ''; ?>" style=" --image-height: <?php echo esc_attr( $attributes['frontImageHeight'] ); ?>; --image-width: <?php echo esc_attr( $attributes['frontImageWidth'] ); ?>; --capitola-objectPosition:<?php echo esc_attr( $attributes['frontImageFocalPoint'] ); ?>">
				<?php echo wp_get_attachment_image( $attributes['frontImage']['id'], 'large' ); ?>
			</figure>
		</div>
	</div>
</section>
