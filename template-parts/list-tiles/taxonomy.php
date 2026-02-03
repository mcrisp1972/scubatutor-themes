<?php

use function Capitola\Helpers\Images\term_thumb_id;

?>

<article class="capitola-result swiper-slide">
	<a class="capitola-result__link" href="<?php echo esc_url( get_term_link( $args['term'] ) ); ?>">
		<div class="capitola-result__image-col --theme-image-overlay">
			<?php echo wp_get_attachment_image( term_thumb_id( $args['term'] ), 'large' ); ?>
			<?php if ( 'image' === $args['conditionals']['titleLocation'] ) : ?>
				<div class="__opacity-layer"></div>
			<?php endif; ?>
			<div class="capitola-result__thumb-content">
				<?php if ( 'image' === $args['conditionals']['titleLocation'] ) : ?>
					<<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> class="capitola-result__thumb-title --hl-s">
						<?php echo esc_html( $args['term']->name ); ?>
					</<?php echo tag_escape( $args['attributes']['titleTag'] ); ?>>
				<?php endif; ?>
				<?php if ( $args['attributes']['ctaText'] && 'image' === $args['conditionals']['ctaLocation'] ) : ?>
					<span class="capitola-result__thumb-cta --cta --tertiary">
						<?php echo esc_html( $args['attributes']['ctaText'] ); ?>
					</span>
				<?php endif; ?>
			</div>
		</div>
		<?php if ( $args['conditionals']['hasBottom'] ) : ?>
			<div class="capitola-result__content">
				<?php if ( 'body' === $args['conditionals']['titleLocation'] ) : ?>
					<<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> class="capitola-result__title --hl-s">
						<?php echo esc_html( $args['term']->name ); ?>
					</<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> >
					<?php
				endif;
				if ( $args['conditionals']['showExcerpt'] && $args['term']->description ) :
					?>
					<p class="capitola-result__excerpt">
						<?php echo esc_html( $args['term']->description ); ?>
					</p>
				<?php endif; ?>
				<?php if ( $args['attributes']['ctaText'] && 'body' === $args['conditionals']['ctaLocation'] ) : ?>
					<div class="capitola-result__cta --cta --tertiary">
						<?php echo esc_html( $args['attributes']['ctaText'] ); ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</a>
</article>
