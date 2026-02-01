<?php

$socials = get_option( 'capitola_social_shares' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignwide',
	)
);

?>
<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<ul class="wp-block-capitola-social-shares__social-links">
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
					<a class="wp-block-capitola-social-shares__social-link --<?= esc_attr( $k ) ?>" href="<?= esc_url( $social_link ) ?>" target="_blank" aria-label="<?= esc_attr( $k ) ?>"></a>
				</li>
			<?php endif; ?>
		<?php endforeach; ?>
	</ul>
</section>
