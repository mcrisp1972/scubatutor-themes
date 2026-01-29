<?php

$attributes = $args['attributes'];
$conditionals = $args['conditionals'];

$event = tribe_get_event( get_the_ID() );

$image_id = get_post_thumbnail_id( $event->ID );

$category = '';

$terms = get_the_terms( $event->ID, 'tribe_events_cat' );
if ( is_array( $terms ) && count( $terms ) ) {
	shuffle( $terms );
	$category = get_term( $terms[0] )->name;
}

$excerpt = get_the_excerpt();

$date = \cwps\tribe\functions\event_date( get_the_ID(), true );

?>

<article class="cwps-result swiper-slide">
	<a class="cwps-result__link" href="<?= esc_url( get_permalink() ) ?>">
	<div class="cwps-result__image-col --theme-image-overlay">
		<?= wp_get_attachment_image( $image_id, 'large' ) ?>
		<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
			<div class="__opacity-layer"></div>
		<?php endif; ?>
		<div class="cwps-result__thumb-content">
			<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
				<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__thumb-title --hl-s">
					<?= esc_html( get_the_title() ) ?>
				</<?= tag_escape( $attributes['titleTag'] ) ?>>
				<div class="cwps-result__thumb-subtitle">
					<?= esc_html( $date ) ?>
				</div>
			<?php endif; ?>
			<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'image' ) : ?>
				<div class="cwps-result__thumb-cta --cta --tertiary">
					<?= esc_html( $attributes['ctaText'] ) ?>
				</div>
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
				<div class="cwps-result__subtitle">
					<?= esc_html( $date ) ?>
				</div>
			<?php endif; ?>
			<?php if ( $excerpt && $conditionals['showExcerpt'] ) : ?>
				<p class="cwps-result__excerpt">
					<?= esc_html( $excerpt ) ?>
				</p>
			<?php endif; ?>
			<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'body' ) : ?>
				<div class="cwps-result__cta --cta --tertiary">
					<?= esc_html( $attributes['ctaText'] ) ?>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>
	</a>
</article>
