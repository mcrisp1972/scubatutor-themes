<?php

$inner_blocks_array = iterator_to_array( $block->inner_blocks );

$images = array_map(
	function ( $inner_block ) {
		return $inner_block->attributes['sideImage'];
	},
	$inner_blocks_array
);

$fade_transition = $attributes['transitionMode'] === 'fade' ? true : false;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( $fade_transition ? ' --has-fade-transition js-stickyImageScroller' : ' --has-scroll-transition' ) . ( $attributes['imageLayout'] === 'full' ? ' --layout-full' : '' ) . ' --intro-' . $attributes['introAlign'] . ( $attributes['imageLayout'] === 'inner' ? ' --has-' . $attributes['imageRadius'] . '-radius' : '' ),
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-sticky-images__width <?= $attributes['imageLayout'] === 'full' ? 'alignfull' : 'alignwide' ?>  js-stickyImagesContainer">
		<div class="wp-block-cwps-sticky-images__image-column">
			<?php foreach ( $images as $key => $image ) : ?>
				<div class="wp-block-cwps-sticky-images__imagewrap js-stickyImagesImage">
					<div class="wp-block-cwps-sticky-images__imageratio" style="--capitola-objectPosition: <?= esc_attr( $block->inner_blocks[ $key ]->attributes['imageCropPosition'] ) ?>;">
						<?= wp_get_attachment_image( $image['id'], 'large' ) ?>
						<?php if ( $block->inner_blocks[ $key ]->attributes['showCaption'] ) : ?>
							<?php $caption = $block->inner_blocks[ $key ]->attributes['captionOverride'] ?: wp_get_attachment_caption( $image ); ?>
							<?php if ( $caption ) : ?>
								<div class="wp-block-cwps-sticky-images__image-caption --micro-text">
								<?= esc_html( $caption ) ?>
								</div>
							<?php endif; ?>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="wp-block-cwps-sticky-images__body-column --align-<?= esc_attr( $attributes['verticalAlign'] ) ?>">
			<?= wp_kses_post( $content ) ?>
		</div>
	</div>
</section>
