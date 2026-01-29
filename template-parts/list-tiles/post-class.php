<?php

$attributes = $args['attributes'];

if ( ! isset( $attributes['postType'] ) ) {
	$attributes['postType'] = get_post_type();
}

$conditionals = $args['conditionals'];

$image_id = get_post_thumbnail_id( get_the_ID() );

$course_id = get_post_meta( get_the_ID(), 'classParentCourseId', true );

$excerpt = get_the_excerpt();

$date = \cwps\courses\functions\class_date( get_the_ID(), true );

$course_name = get_the_title( $course_id );
?>

<article id="post-<?= esc_attr( get_the_ID() ) ?>" class="cwps-result swiper-slide">
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
				<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
					<div class="cwps-result__thumb-cat">
						<?= esc_html( $course_name ) ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php if ( $conditionals['hasBottom'] ) : ?>
			<div class="cwps-result__content">
				<?php if ( $conditionals['titleLocation'] === 'body' ) : ?>
					<div>
						<?php if ( $course_name ) : ?>
							<div class="cwps-result__body-cat --eyebrow">
								<?= esc_html( $course_name ) ?>
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
				if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'body' ) :
					?>
					<div class="cwps-result__cta --cta  --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</a>
</article>
