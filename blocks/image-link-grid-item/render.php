<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\page_parent_label;

$subtitle = $attributes['eyebrowOverride'] ? $attributes['eyebrowOverride'] : page_parent_label( $attributes['postId'] );

$post_title = $attributes['titleOverride'] ? $attributes['titleOverride'] : get_the_title( $attributes['postId'] );

$excerpt = $attributes['excerptOverride'] ? $attributes['excerptOverride'] : get_the_excerpt( $attributes['postId'] );

$cta_label = $attributes['ctaOverride'] ? $attributes['ctaOverride'] : apply_filters( 'capitola_' . get_post_type( $attributes['postId'] ) . '_cta_label', '' );

$image_id = $attributes['imageOverride']['id'];
if ( ! $image_id ) {
	$image_id = get_post_thumbnail_id( $attributes['postId'] );
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => '--theme-image-overlay',
	)
);

?>

<a <?php echo wp_kses_data( $wrapper_attributes ); ?> href="<?php echo esc_url( get_the_permalink( $attributes['postId'] ) ); ?>" style="--capitola-overlayOpacity: <?php echo esc_attr( $attributes['imageOpacity'] ); ?>;">
	<?php echo wp_get_attachment_image( $image_id, 'large' ); ?>
	<div class="wp-block-capitola-image-link-grid-item__opacity-layer"></div>
	<div class="wp-block-capitola-image-link-grid-item__text-content">
		<div class="wp-block-capitola-image-link-grid-item__title-wrap">
			<?php if ( $subtitle ) : ?>
				<div class="wp-block-capitola-image-link-grid-item__subtitle --eyebrow">
					<?php echo esc_html( $subtitle ); ?>
				</div>
			<?php endif; ?>
			<div class="wp-block-capitola-image-link-grid-item__title --hl-s"><?php echo esc_html( $post_title ); ?></div>
		</div>
		<div class="wp-block-capitola-image-link-grid-item__excerpt-wrap">
			<?php if ( $excerpt ) : ?>
				<p class="wp-block-capitola-image-link-grid-item__excerpt">
					<?php echo esc_html( $excerpt ); ?>
				</p>
			<?php endif; ?>
			<div class="wp-block-capitola-image-link-grid-item__cta --cta --tertiary">
				<?php echo esc_html( $cta_label ); ?>
			</div>
		</div>
	</div>
</a>
