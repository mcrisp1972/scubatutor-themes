<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$capitola_socials = get_option( 'capitola_social_shares' );

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
		foreach ( $capitola_socials as $capitola_social_slug => $capitola_social_enabled ) :
			$capitola_social_link = '';
			if ( $capitola_social_enabled ) {
				switch ( $capitola_social_slug ) {
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
					<a class="wp-block-capitola-social-shares__social-link --<?php echo esc_attr( $capitola_social_slug ); ?>" href="<?php echo esc_url( $capitola_social_link ); ?>" target="_blank" aria-label="<?php echo esc_attr( $capitola_social_slug ); ?>"></a>
				</li>
			<?php endif; ?>
		<?php endforeach; ?>
	</ul>
</section>
