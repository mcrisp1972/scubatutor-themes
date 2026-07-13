<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$socials          = get_option( 'capitola_social_shares' );
$author_id        = get_the_author_meta( 'ID' );
$author_image     = get_user_meta( $author_id, 'userProfilePhoto', true );
$author_name      = esc_html( get_the_author_meta( 'display_name' ) );
$author_image_src = $author_image ? wp_get_attachment_image_src( $author_image, 'thumbnail' ) : false;
$image_id         = $attributes['featuredImage'] ? $attributes['featuredImage'] : get_post_thumbnail_id();

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignwide ' . ( 'bottom' === $attributes['imageLocation'] ? ' --bottom-image' : '' ),
	)
);


?>

<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php if ( $attributes['showFeaturedImage'] && $image_id ) : ?>
		<div class="wp-block-capitola-post-hero__hero">
			<div class="wp-block-capitola-post-hero__image">
				<?php echo wp_get_attachment_image( $image_id, 'large', false, array( 'loading' => 'eager' ) ); ?>
			</div>
		</div>
	<?php endif; ?>
	<<?php echo tag_escape( $attributes['headlineTag'] ); ?> class="wp-block-capitola-post-hero__title --hl-xl">
		<?php echo esc_html( $attributes['headline'] ? $attributes['headline'] : get_the_title() ); ?>
	</<?php echo tag_escape( $attributes['headlineTag'] ); ?>>
	<div class="wp-block-capitola-post-hero__details">
		<div class="wp-block-capitola-post-hero__byline --text-s">
		<?php if ( get_post_type() === 'post' ) : ?>
			<?php if ( $attributes['showByline'] ) : ?>
				<?php if ( $author_image_src ) : ?>
					<div class="wp-block-capitola-post-hero__byline-img-wrap">
						<img src="<?php echo esc_url( $author_image_src[0] ); ?>" alt="<?php echo esc_attr( $author_name ); ?>"/>
					</div>
				<?php endif; ?>
				<div class="wp-block-capitola-post-hero__byline-date">
					<div><?php echo esc_html( $author_name ); ?></div>
					<div><?php echo get_the_date( "M jS 'y" ); ?></div>
				</div>
			<?php endif; ?>
		<?php endif; ?>
		</div>
		<?php if ( $attributes['showSocials'] ) : ?>
			<ul class="wp-block-capitola-post-hero__social-links">
				<?php
				foreach ( $socials as $social_slug => $social_enabled ) :
					$social_link = '';
					if ( $social_enabled ) {
						switch ( $social_slug ) {
							case 'facebook':
								$social_link = 'http://www.facebook.com/share.php?u=' . rawurlencode( get_permalink() );
								break;
							case 'twitter':
								$social_link = 'http://twitter.com/share?url=' . rawurlencode( get_permalink() );
								break;
							case 'pinterest':
								$social_link = 'http://pinterest.com/pin/create/link/?url=' . rawurlencode( get_permalink() );
								break;
							case 'linkedin':
								$social_link = 'https://www.linkedin.com/shareArticle?mini=true&url=' . rawurlencode( get_permalink() ) . '&title=' . rawurlencode( get_the_title() ) . '&summary=' . rawurlencode( get_the_excerpt() ) . '&source=' . rawurlencode( get_home_url() );
								break;
						}
					}

					if ( $social_link ) :
						?>
						<li>
							<a class="wp-block-capitola-post-hero__social-link --<?php echo esc_attr( $social_slug ); ?>" href="<?php echo esc_url( $social_link ); ?>" target="_blank" aria-label="<?php echo esc_attr( $social_slug ); ?>"></a>
						</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
</section>
