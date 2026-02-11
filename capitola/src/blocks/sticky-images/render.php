<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$images = array_map(
	function ( $inner_block ) {
		return $inner_block->attributes['sideImage'];
	},
	iterator_to_array( $block->inner_blocks )
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( 'fade' === $attributes['transitionMode'] ? ' --has-fade-transition js-stickyImageScroller' : ' --has-scroll-transition' ) . ( 'full' === $attributes['imageLayout'] ? ' --layout-full' : '' ) . ' --intro-' . $attributes['introAlign'] . ( 'inner' === $attributes['imageLayout'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '' ),
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-sticky-images__width <?php echo 'full' === $attributes['imageLayout'] ? 'alignfull' : 'alignwide'; ?>  js-stickyImagesContainer">
		<div class="wp-block-capitola-sticky-images__image-column">
			<?php foreach ( $images as $key => $image ) : ?>
				<div class="wp-block-capitola-sticky-images__imagewrap js-stickyImagesImage">
					<div class="wp-block-capitola-sticky-images__imageratio" style="--capitola-objectPosition: <?php echo esc_attr( $block->inner_blocks[ $key ]->attributes['imageCropPosition'] ); ?>;">
						<?php echo wp_get_attachment_image( $image['id'], 'large' ); ?>
						<?php if ( $block->inner_blocks[ $key ]->attributes['showCaption'] ) : ?>
							<?php
							$caption = $block->inner_blocks[ $key ]->attributes['captionOverride'];
							if ( ! $caption ) {
								$caption = wp_get_attachment_caption( $image );
							}
							?>
							<?php if ( $caption ) : ?>
								<div class="wp-block-capitola-sticky-images__image-caption --micro-text">
								<?php echo esc_html( $caption ); ?>
								</div>
							<?php endif; ?>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="wp-block-capitola-sticky-images__body-column --align-<?php echo esc_attr( $attributes['verticalAlign'] ); ?>">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
</section>
