<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$contact_info    = get_option( 'capitola_contact' );
$attributes      = \Capitola\Helpers\Block_Attributes\alternate_theme( $attributes, 'footerTheme' );
$current_weather = get_option( 'capitola_current_weather' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);
?>

<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-footer__copyright">
		&copy;<?php echo esc_html( gmdate( 'Y' ) . ', ' . get_bloginfo( 'name' ) ); ?>
	</div>
</div>
<?php

if ( $attributes['showCookieBanner'] ) :
	?>
	<div id="js-cookieConsent" class="capitola-cookie-consent --is-hidden is-layout-constrained has-global-padding --theme-<?php echo esc_attr( $attributes['cookieBannerTheme'] ); ?>">
		<div class="capitola-cookie-consent__body alignwide">
			<p class="capitola-cookie-consent__notice">
				<?php echo wp_kses_post( $attributes['cookieBannerText'] ); ?>
			</p>
			<?php if ( $attributes['cookieBannerCloseText'] ) : ?>
				<button id="js-cookieConsentCTA" class="capitola-cookie-consent__cta --cta js-closeConsent"><?php echo esc_html( $attributes['cookieBannerCloseText'] ); ?></button>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>
