<?php

$capitola_socials = get_option( 'capitola_social_shares' );
$capitola_author_id = get_the_author_meta( 'ID' );
$capitola_author_image = get_user_meta( $capitola_author_id, 'userProfilePhoto', true );
$capitola_author_name = esc_html( get_the_author_meta( 'display_name' ) );
$capitola_author_image_src = $capitola_author_image ? wp_get_attachment_image_src( $capitola_author_image, 'thumbnail' ) : false;
$capitola_image_id = $attributes['featuredImage'] ? $attributes['featuredImage'] : get_post_thumbnail_id();

?>

<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignwide ' . ( 'bottom' === $attributes['imageLocation'] ? ' --bottom-image' : '' ),
		)
	)
);
?>
>
	<?php if ( $attributes['showFeaturedImage'] && $capitola_image_id ) : ?>
		<div class="wp-block-capitola-post-hero__hero">
			<div class="wp-block-capitola-post-hero__image">
				<?= wp_get_attachment_image( $capitola_image_id, 'large', false, array( 'loading' => 'eager' ) ); ?>
			</div>
		</div>
	<?php endif; ?>
	<<?= tag_escape( $attributes['headlineTag'] ); ?> class="wp-block-capitola-post-hero__title --hl-xl">
		<?= esc_html( $attributes['headline'] ? $attributes['headline'] : get_the_title() ); ?>
	</<?= tag_escape( $attributes['headlineTag'] ); ?>>
	<div class="wp-block-capitola-post-hero__details">
		<div class="wp-block-capitola-post-hero__byline">
		<?php if ( get_post_type() === 'post' ) : ?>
			<?php if ( $attributes['showByline'] ) : ?>
				<?php if ( $capitola_author_image_src ) : ?>
					<div class="wp-block-capitola-post-hero__byline-img-wrap">
						<img src="<?= esc_url( $capitola_author_image_src[0] ); ?>" alt="<?= esc_attr( $capitola_author_name ); ?>"/>
					</div>
				<?php endif; ?>
				<div class="wp-block-capitola-post-hero__byline-date">
					<div><?= esc_html( $capitola_author_name ); ?></div>
					<div><?= get_the_date( "M jS 'y" ); ?></div>
				</div>
			<?php endif; ?>
		<?php endif; ?>
		</div>
		<?php if ( $attributes['showSocials'] ) : ?>
			<ul class="wp-block-capitola-post-hero__social-links">
				<?php
				foreach ( $capitola_socials as $capitola_social_slug => $capitola_social_enabled ) :
					$capitola_social_link = '';
					if ( $capitola_social_enabled ) {
						switch ( $k ) {
							case 'facebook':
								$capitola_social_link = 'http://www.facebook.com/share.php?u=' . rawurlencode( get_permalink() );
								break;
							case 'twitter':
								$capitola_social_link = 'http://twitter.com/share?url=' . rawurlencode( get_permalink() );
								break;
							case 'pinterest':
								$capitola_social_link = 'http://pinterest.com/pin/create/link/?url=' . rawurlencode( get_permalink() );
								break;
							case 'linkedin':
								$capitola_social_link = 'https://www.linkedin.com/shareArticle?mini=true&url=' . rawurlencode( get_permalink() ) . '&title=' . rawurlencode( get_the_title() ) . '&summary=' . rawurlencode( get_the_excerpt() ) . '&source=' . rawurlencode( get_home_url() );
								break;
						}
					}

					if ( $capitola_social_link ) :
						?>
						<li>
							<a class="wp-block-capitola-post-hero__social-link --<?= esc_attr( $capitola_social_slug ); ?>" href="<?= esc_url( $capitola_social_link ); ?>" target="_blank" aria-label="<?= esc_attr( $capitola_social_slug ); ?>"></a>
						</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
</section>
