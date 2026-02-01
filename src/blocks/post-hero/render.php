<?php

$socials = get_option( 'capitola_social_shares' );
$author_id = get_the_author_meta( 'ID' );
$author_image = get_user_meta( $author_id, 'userProfilePhoto', true );
$name = esc_html( get_the_author_meta( 'display_name' ) );
$author_image_src = $author_image ? wp_get_attachment_image_src( $author_image, 'thumbnail' ) : false;
$image_id = $attributes['featuredImage'] ? $attributes['featuredImage'] : get_post_thumbnail_id();

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignwide ' . ( $attributes['imageLocation'] === 'bottom' ? ' --bottom-image' : '' ),
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?php if ( $attributes['showFeaturedImage'] && $image_id ) : ?>
		<div class="wp-block-capitola-post-hero__hero">
			<div class="wp-block-capitola-post-hero__image">
				<?= wp_get_attachment_image( $image_id, 'large', false, array( 'loading' => 'eager' ) ) ?>
			</div>
		</div>
	<?php endif; ?>
	<<?= tag_escape( $attributes['headlineTag'] ) ?> class="wp-block-capitola-post-hero__title --hl-xl">
		<?= esc_html( $attributes['headline'] ? $attributes['headline'] : get_the_title() ) ?>
	</<?= tag_escape( $attributes['headlineTag'] ) ?>>
	<div class="wp-block-capitola-post-hero__details">
		<div class="wp-block-capitola-post-hero__byline">
		<?php if ( get_post_type() === 'post' ) : ?>
			<?php if ( $attributes['showByline'] ) : ?>
				<?php if ( $author_image_src ) : ?>
					<div class="wp-block-capitola-post-hero__byline-img-wrap">
						<img src="<?= esc_url( $author_image_src[0] ) ?>" alt="<?= esc_html( $name ) ?>"/>
					</div>
				<?php endif; ?>
				<div class="wp-block-capitola-post-hero__byline-date">
					<div><?= esc_html( $name ) ?></div>
					<div><?= get_the_date( "M jS 'y" ) ?></div>
				</div>
			<?php endif; ?>
		<?php endif; ?>
		</div>
		<?php if ( $attributes['showSocials'] ) : ?>
			<ul class="wp-block-capitola-post-hero__social-links">
				<?php
				foreach ( $socials as $k => $v ) :
					$social_link = '';
					if ( $v ) {
						switch ( $k ) {
							case 'facebook':
								$social_link = 'http://www.facebook.com/share.php?u=' . urlencode( get_permalink() );
								break;
							case 'twitter':
								$social_link = 'http://twitter.com/share?url=' . urlencode( get_permalink() );
								break;
							case 'pinterest':
								$social_link = 'http://pinterest.com/pin/create/link/?url=' . urlencode( get_permalink() );
								break;
							case 'linkedin':
								$social_link = 'https://www.linkedin.com/shareArticle?mini=true&url=' . urlencode( get_permalink() ) . '&title=' . urlencode( get_the_title() ) . '&summary=' . urlencode( get_the_excerpt() ) . '&source=' . urlencode( get_home_url() );
								break;
						}
					}

					if ( $social_link ) :
						?>
						<li>
							<a class="wp-block-capitola-post-hero__social-link --<?= esc_attr( $k ) ?>" href="<?= esc_url( $social_link ) ?>" target="_blank" aria-label="<?= esc_attr( $k ) ?>"></a>
						</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
</section>
