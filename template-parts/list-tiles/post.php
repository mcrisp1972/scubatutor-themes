<?php

$attributes = $args['attributes'];

if ( ! isset( $attributes['postType'] ) ) {
	$attributes['postType'] = get_post_type();
}

$conditionals = $args['conditionals'];

$excerpt = get_the_excerpt();

$image_id = get_post_thumbnail_id( get_the_ID() );

$category = \cwps\helpers\stringHelpers\get_post_term_name( get_the_ID() );

$date = '';

if ( get_post_type() === 'trip' ) {
	$date = \cwps\trips\functions\trip_date( get_the_ID(), true );
}

?>

<article class="cwps-result swiper-slide">
	<a class="cwps-result__link" href="<?= esc_url( get_permalink() ) ?>">
		<div class="cwps-result__image-col --theme-image-overlay">
			<?= wp_get_attachment_image( $image_id, 'large' ) ?>
			<?php if ( $conditionals['titleLocation'] === 'image' || $conditionals['ctaLocation'] === 'image' ) : ?>
				<div class="__opacity-layer"></div>
			<?php endif; ?>
			<div class="cwps-result__thumb-content">
				<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
					<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__thumb-title --hl-s">
						<?= esc_html( get_the_title() ) ?>
					</<?= tag_escape( $attributes['titleTag'] ) ?>>
					<?php if ( $date ) : ?>
						<div class="cwps-result__thumb-subtitle">
							<?= esc_html( $date ) ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'image' ) : ?>
					<span class="cwps-result__thumb-cta --cta --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</span>
				<?php endif; ?>
			</div>
			<?php if ( $category && $conditionals['titleLocation'] === 'image' ) : ?>
				<div class="cwps-result__thumb-cat">
					<?= esc_html( $category ) ?>
				</div>
			<?php endif; ?>
		</div>
		<?php if ( $conditionals['hasBottom'] ) : ?>
			<div class="cwps-result__content">
				<?php if ( $conditionals['titleLocation'] === 'body' ) : ?>
					<div>
						<?php if ( $category ) : ?>
							<div class="cwps-result__body-cat --eyebrow">
								<?= esc_html( $category ) ?>
							</div>
						<?php endif; ?>
						<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__title --hl-s">
							<?= esc_html( get_the_title() ) ?>
						</<?= tag_escape( $attributes['titleTag'] ) ?> >
					</div>
					<?php if ( $date ) : ?>
						<div class="cwps-result__subtitle">
							<?= esc_html( $date ) ?>
						</div>
					<?php endif; ?>
					<?php
				endif;
				if ( $excerpt && $conditionals['showExcerpt'] ) :
					?>
					<p class="cwps-result__excerpt">
						<?= esc_html( $excerpt ) ?>
					</p>
					<?php
				endif;
				if ( $conditionals['showByline'] ) :
					$author_id = get_the_author_meta( 'ID' );
					$author_image = get_user_meta( $author_id, 'userProfilePhoto', true );
					$name = esc_html( get_the_author_meta( 'display_name' ) );
					$author_image = wp_get_attachment_image_src( $author_image, 'thumbnail' );
					?>
					<div class="cwps-result__byline">
						<?php if ( $author_image ) : ?>
							<div class="cwps-result__byline-img-wrap">
								<img src="<?= esc_url( $author_image[0] ) ?>" alt="<?= esc_html( $name ) ?>"/>
							</div>
						<?php endif; ?>
						<div class="cwps-result__byline-date"><?= esc_html( $name ) ?><br><?= esc_html( get_the_date( "M jS 'y" ) ) ?></div>
					</div>
					<?php
				endif;
				if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'body' ) :
					?>
					<div class="cwps-result__cta --cta --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</a>
</article>
