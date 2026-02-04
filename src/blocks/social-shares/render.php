<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$socials = get_option( 'capitola_social_shares' );

?>
<section
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignwide',
		)
	)
);
?>
>
	<ul class="wp-block-capitola-social-shares__social-links">
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
					<a class="wp-block-capitola-social-shares__social-link --<?php echo esc_attr( $social_slug ); ?>" href="<?php echo esc_url( $social_link ); ?>" target="_blank" aria-label="<?php echo esc_attr( $social_slug ); ?>"></a>
				</li>
			<?php endif; ?>
		<?php endforeach; ?>
	</ul>
</section>
