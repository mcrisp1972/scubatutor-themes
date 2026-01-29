<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package crispscubatheme
 */

$attributes = $args['attributes'];

if ( ! isset( $args['post-type'] ) ) {
	$args['post-type'] = 'product';
}

if ( ! isset( $args['product'] ) ) {
	global $product;
	$args['product'] = $product;

	// Ensure visibility.
	if ( empty( $product ) || ! $product->is_visible() ) {
		return;
	}
}

//phpcs:ignoreFile Generic.CodeAnalysis.AssignmentInCondition.Found

$product = $args['product'];

$show_description = $attributes['showExcerpt'] ?? false;

?>

<article class="cwps-result swiper-slide">
	<a class="cwps-result__link" href="<?= get_permalink( $product->get_id() ) ?>" aria-label="<?= esc_attr( $product->get_name() ) ?>">
		<div class="cwps-result__image-col --contain">
			<?= $product->get_image( 'large' ); ?>
			<?php if ( $product->is_on_sale() ) : ?>
				<span class="cwps-result__badge">Sale!</span>
			<?php endif; ?>
		</div>
		<div class="cwps-result__content --product-grid">
			<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__title --hl-s">
				<?= $product->get_name() ?>
			</<?= tag_escape( $attributes['titleTag'] ) ?>>
			<div class="cwps-result__product-meta">
				<?php
				if ( $attributes['showBrand'] ) :
					$brands = wp_get_post_terms( $product->get_id(), 'product_brand' );
					if ( ! is_wp_error( $brands ) ) :
						if ( sizeof( $brands ) > 0 ) :
							?>
							<div class="cwps-result__product-meta-detail">
								<?= $brands[0]->name ?>
							</div>
						<?php endif; ?>
					<?php endif; ?>
				<?php endif; ?>
				<?php
				if ( $attributes['showPartNumber'] ) :
					$pn = get_post_meta( $product->get_id(), 'product_part_number', true );
					if ( $pn ) :
						?>
						<div class="cwps-result__product-meta-detail">
							<?php if ( $attributes['partNumberPrefix'] ) : ?>
								<span>
									<?= $attributes['partNumberPrefix'] ?>
								</span>
							<?php endif; ?>
							<span> <?= $pn ?></span>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				<?php
				if ( $attributes['showMSRP'] ) :
					$msrp = \cwps\woo\stringHelpers\calculate_msrp( $product );
					if ( $msrp ) :
						?>
						<div class="cwps-result__product-meta-detail">
							<?php if ( $attributes['msrpPrefix'] ) : ?>
								<?= $attributes['msrpPrefix'] ?>
							<?php endif; ?>
							<span><?= $msrp ?></span>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				<div class="cwps-result__product-meta-detail">
					<?php if ( $attributes['ourPricePrefix'] && ! empty( $msrp ) ) : ?>
						<span><?= $attributes['ourPricePrefix'] ?></span>
					<?php endif; ?>
					<span>
						<?= $product->get_price_html() ?>
					</span>
				</div>
				<?php
				if ( wc_review_ratings_enabled() && $attributes['showRating'] && $product->get_average_rating() ) :
					$rating = ( round( $product->get_average_rating() * 2 ) / 2 );
					?>
					<div class="cwps-result__product-meta-detail star-rating" role="img" aria-label="Rated <?= $product->get_average_rating() ?> out of 5" data-rating="<?= $rating ?>"></div>
				<?php endif; ?>
			</div>
			<?php if ( $show_description && $excerpt = $product->get_short_description() ) : ?>
				<p class="cwps-result__excerpt">
					<?= $excerpt ?>
                </p>
			<?php endif; ?>
			<?php if ( ! empty( $attributes['ctaText'] ) ) : ?>
				<div class="cwps-result__cta --cta --tertiary">
					<?= $attributes['ctaText'] ?>
				</div>
			<?php endif; ?>
		</div>
	</a>
</article>
