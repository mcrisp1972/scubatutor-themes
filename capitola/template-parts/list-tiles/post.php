<?php

use function Capitola\Helpers\String_Helpers\get_post_term_name;

if ( ! isset( $args['attributes']['postType'] ) ) {
	$args['attributes']['postType'] = get_post_type();
}

$excerpt = get_the_excerpt();

$category_name = get_post_term_name( get_the_ID() );

?>

<article class="capitola-result swiper-slide">
	<a class="capitola-result__link" href="<?php echo esc_url( get_permalink() ); ?>">
		<div class="capitola-result__image-col --theme-image-overlay">
			<?php echo wp_get_attachment_image( get_post_thumbnail_id( get_the_ID() ), 'large' ); ?>
			<?php if ( 'image' === $args['conditionals']['titleLocation'] || 'image' === $args['conditionals']['ctaLocation'] ) : ?>
				<div class="__opacity-layer"></div>
			<?php endif; ?>
			<div class="capitola-result__thumb-content">
				<?php if ( 'image' === $args['conditionals']['titleLocation'] ) : ?>
					<<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> class="capitola-result__thumb-title --hl-s">
						<?php echo esc_html( get_the_title() ); ?>
					</<?php echo tag_escape( $args['attributes']['titleTag'] ); ?>>
				<?php endif; ?>
				<?php if ( $args['attributes']['ctaText'] && 'image' === $args['conditionals']['ctaLocation'] ) : ?>
					<span class="capitola-result__thumb-cta --cta --tertiary">
						<?php echo esc_html( $args['attributes']['ctaText'] ); ?>
					</span>
				<?php endif; ?>
			</div>
			<?php if ( $category_name && 'image' === $args['conditionals']['titleLocation'] ) : ?>
				<div class="capitola-result__thumb-cat">
					<?php echo esc_html( $category_name ); ?>
				</div>
			<?php endif; ?>
		</div>
		<?php if ( $args['conditionals']['hasBottom'] ) : ?>
			<div class="capitola-result__content">
				<?php if ( 'body' === $args['conditionals']['titleLocation'] ) : ?>
					<div>
						<?php if ( $category_name ) : ?>
							<div class="capitola-result__body-cat --eyebrow">
								<?php echo esc_html( $category_name ); ?>
							</div>
						<?php endif; ?>
						<<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> class="capitola-result__title --hl-s">
							<?php echo esc_html( get_the_title() ); ?>
						</<?php echo tag_escape( $args['attributes']['titleTag'] ); ?> >
					</div>
					<?php
				endif;
				if ( $excerpt && $args['conditionals']['showExcerpt'] ) :
					?>
					<p class="capitola-result__excerpt">
						<?php echo esc_html( $excerpt ); ?>
					</p>
					<?php
				endif;
				if ( $args['conditionals']['showByline'] ) :
					$author_image_id = get_user_meta( get_the_author_meta( 'ID' ), 'userProfilePhoto', true );
					$name            = esc_html( get_the_author_meta( 'display_name' ) );
					$author_image    = wp_get_attachment_image_src( $author_image_id, 'thumbnail' );
					?>
					<div class="capitola-result__byline">
						<?php if ( $author_image ) : ?>
							<div class="capitola-result__byline-img-wrap">
								<img src="<?php echo esc_url( $author_image[0] ); ?>" alt="<?php echo esc_html( $name ); ?>"/>
							</div>
						<?php endif; ?>
						<div class="capitola-result__byline-date"><?php echo esc_html( $name ); ?><br><?php echo esc_html( get_the_date( "M jS 'y" ) ); ?></div>
					</div>
					<?php
				endif;
				if ( $args['attributes']['ctaText'] && 'body' === $args['conditionals']['ctaLocation'] ) :
					?>
					<div class="capitola-result__cta --cta --tertiary">
						<?php echo esc_html( $args['attributes']['ctaText'] ); ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</a>
</article>
