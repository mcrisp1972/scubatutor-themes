<?php

$attributes = $args['attributes'];
$conditionals = $args['conditionals'];

$image_id = \Capitola\Helpers\Images\term_thumb_id( $args['term'] );

?>

<article class="cwps-result swiper-slide">
	<a class="cwps-result__link" href="<?= esc_url( get_term_link( $args['term'] ) ) ?>">
		<div class="cwps-result__image-col --theme-image-overlay">
			<?= wp_get_attachment_image( $image_id, 'large' ) ?>
			<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
				<div class="__opacity-layer"></div>
			<?php endif; ?>
			<div class="cwps-result__thumb-content">
				<?php if ( $conditionals['titleLocation'] === 'image' ) : ?>
					<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__thumb-title --hl-s">
						<?= esc_html( $args['term']->name ) ?>
					</<?= tag_escape( $attributes['titleTag'] ) ?>>
				<?php endif; ?>
				<?php if ( $attributes['ctaText'] && $conditionals['ctaLocation'] === 'image' ) : ?>
					<span class="cwps-result__thumb-cta --cta --tertiary">
						<?= esc_html( $attributes['ctaText'] ) ?>
					</span>
				<?php endif; ?>
			</div>
		</div>
		<?php if ( $conditionals['hasBottom'] ) : ?>
			<div class="cwps-result__content">
				<?php if ( $conditionals['titleLocation'] === 'body' ) : ?>
					<<?= tag_escape( $attributes['titleTag'] ) ?> class="cwps-result__title --hl-s">
						<?= esc_html( $args['term']->name ) ?>
					</<?= tag_escape( $attributes['titleTag'] ) ?> >
					<?php
				endif;
				if ( $conditionals['showExcerpt'] && $args['term']->description ) :
					?>
					<p class="cwps-result__excerpt">
						<?= esc_html( $args['term']->description ) ?>
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
