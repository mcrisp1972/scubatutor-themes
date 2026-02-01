<?php

$attributes = $args['attributes'];
$conditionals = $args['conditionals'];

$image_id = \Capitola\Helpers\Images\term_thumb_id( $args['term'] );

?>

<article class="capitola-result swiper-slide">
	<a class="capitola-result__link" href="<?= esc_url( get_term_link( $args['term'] ) ) ?>">
		<div class="capitola-result__image-col --theme-image-overlay">
			<?= wp_get_attachment_image( $image_id, 'large' ) ?>
			<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
				<div class="__opacity-layer"></div>
			<?php endif; ?>
			<div class="capitola-result__thumb-content">
				<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
					<<?= tag_escape( $attributes['titleTag'] ) ?> class="capitola-result__thumb-title --hl-s">
						<?= esc_html( $args['term']->name ) ?>
					</<?= tag_escape( $attributes['titleTag'] ) ?>>
				<?php endif; ?>
				<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'image' ) : ?>
					<span class="capitola-result__thumb-cta --cta --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</span>
				<?php endif; ?>
			</div>
		</div>
		<?php if ( $conditionals['hasBottom'] ) : ?>
			<div class="capitola-result__content">
				<?php if ( $conditionals['titleLocation'] === 'body' ) : ?>
					<<?= tag_escape( $attributes['titleTag'] ) ?> class="capitola-result__title --hl-s">
						<?= esc_html( $args['term']->name ) ?>
					</<?= tag_escape( $attributes['titleTag'] ) ?> >
					<?php
				endif;
				if ( $conditionals['showExcerpt'] && $args['term']->description ) :
					?>
					<p class="capitola-result__excerpt">
						<?= esc_html( $args['term']->description ) ?>
					</p>
				<?php endif; ?>
				<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'body' ) : ?>
					<div class="capitola-result__cta --cta --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</a>
</article>
