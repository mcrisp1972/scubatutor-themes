<?php

$capitola_images = array_map(
	function ( $inner_block ) {
		return $inner_block->attributes['sideImage'];
	},
	iterator_to_array( $block->inner_blocks )
);

?>
<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'] . ( 'fade' === $attributes['transitionMode'] ? ' --has-fade-transition js-stickyImageScroller' : ' --has-scroll-transition' ) . ( 'full' === $attributes['imageLayout'] ? ' --layout-full' : '' ) . ' --intro-' . $attributes['introAlign'] . ( 'inner' === $attributes['imageLayout'] ? ' --has-' . $attributes['imageRadius'] . '-radius' : '' ),
		)
	)
);
?>
>
	<div class="wp-block-capitola-sticky-images__width <?= 'full' === $attributes['imageLayout'] ? 'alignfull' : 'alignwide'; ?>  js-stickyImagesContainer">
		<div class="wp-block-capitola-sticky-images__image-column">
			<?php foreach ( $capitola_images as $capitola_key => $capitola_image ) : ?>
				<div class="wp-block-capitola-sticky-images__imagewrap js-stickyImagesImage">
					<div class="wp-block-capitola-sticky-images__imageratio" style="--capitola-objectPosition: <?= esc_attr( $block->inner_blocks[ $capitola_key ]->attributes['imageCropPosition'] ); ?>;">
						<?= wp_get_attachment_image( $capitola_image['id'], 'large' ); ?>
						<?php if ( $block->inner_blocks[ $capitola_key ]->attributes['showCaption'] ) : ?>
							<?php $capitola_caption = $block->inner_blocks[ $capitola_key ]->attributes['captionOverride'] ?: wp_get_attachment_caption( $capitola_image ); ?>
							<?php if ( $capitola_caption ) : ?>
								<div class="wp-block-capitola-sticky-images__image-caption --micro-text">
								<?= esc_html( $capitola_caption ); ?>
								</div>
							<?php endif; ?>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="wp-block-capitola-sticky-images__body-column --align-<?= esc_attr( $attributes['verticalAlign'] ); ?>">
			<?= wp_kses_post( $content ); ?>
		</div>
	</div>
</section>
