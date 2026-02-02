<?php

use function Capitola\Helpers\String_Helpers\page_parent_label;

$capitola_subtitle = $attributes['eyebrowOverride'] ? $attributes['eyebrowOverride'] : page_parent_label( $attributes['postId'] );

$capitola_post_title = $attributes['titleOverride'] ? $attributes['titleOverride'] : get_the_title( $attributes['postId'] );

$capitola_excerpt = $attributes['excerptOverride'] ? $attributes['excerptOverride'] : get_the_excerpt( $attributes['postId'] );

$capitola_cta_label = $attributes['ctaOverride'] ? $attributes['ctaOverride'] : apply_filters( 'capitola_' . get_post_type( $attributes['postId'] ) . '_cta_label', '' );

$capitola_image_id = $attributes['imageOverride']['id'] ?: get_post_thumbnail_id( $attributes['postId'] );

?>

<a
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => '--theme-image-overlay',
		)
	)
);
?>
href="<?= esc_url( get_the_permalink( $attributes['postId'] ) ); ?>" style="--capitola-overlayOpacity: <?= esc_attr( $attributes['imageOpacity'] ); ?>;">
	<?= wp_get_attachment_image( $capitola_image_id, 'large' ); ?>
	<div class="wp-block-capitola-image-link-grid-item__opacity-layer"></div>
	<div class="wp-block-capitola-image-link-grid-item__text-content">
		<div class="wp-block-capitola-image-link-grid-item__title-wrap">
			<?php if ( $capitola_subtitle ) : ?>
				<div class="wp-block-capitola-image-link-grid-item__subtitle --eyebrow">
					<?= esc_html( $capitola_subtitle ); ?>
				</div>
			<?php endif; ?>
			<div class="wp-block-capitola-image-link-grid-item__title --hl-s"><?= esc_html( $capitola_post_title ); ?></div>
		</div>
		<div class="wp-block-capitola-image-link-grid-item__excerpt-wrap">
			<?php if ( $capitola_excerpt ) : ?>
				<p class="wp-block-capitola-image-link-grid-item__excerpt">
					<?= esc_html( $capitola_excerpt ); ?>
				</p>
			<?php endif; ?>
			<div class="wp-block-capitola-image-link-grid-item__cta --cta --tertiary">
				<?= esc_html( $capitola_cta_label ); ?>
			</div>
		</div>
	</div>
</a>
