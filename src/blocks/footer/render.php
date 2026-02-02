<?php

use function Capitola\Helpers\Block_Attributes\alternate_theme;

$capitola_contact_info = get_option( 'capitola_contact' );

// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
$attributes = alternate_theme( $attributes, 'footerTheme' );

?>

<div
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-footer__grid alignwide">
		<div class="wp-block-capitola-footer__menus">
			<?= wp_kses_post( $content ); ?>
		</div>
		<div class="wp-block-capitola-footer__contact">
			<div class="wp-block-capitola-footer__contact-info">
				<?php if ( $attributes['showBusinessName'] ) : ?>
					<div><?= esc_html( $capitola_contact_info['business_name'] ); ?></div>
				<?php endif; ?>
				<?php if ( $attributes['showAddress'] ) : ?>
					<div><?= esc_html( $capitola_contact_info['address'] ); ?></div>
				<?php endif; ?>
				<?php if ( $attributes['showMapLink'] ) : ?>
					<a class="wp-block-capitola-footer__contact-link --map" href="<?= esc_url( $capitola_contact_info['gmap_link'] ); ?>" target="_blank">Directions</a>
				<?php endif; ?>
				<?php if ( $attributes['showPhoneNumber'] ) : ?>
					<a class="wp-block-capitola-footer__contact-link --phone" href="tel:<?= esc_attr( \Capitola\Helpers\String_Helpers\phone_link_number( $capitola_contact_info['phone'] ) ); ?>"><?= esc_html( $capitola_contact_info['phone'] ); ?></a>
				<?php endif; ?>
				<?php if ( $attributes['showEmail'] ) : ?>
					<a class="wp-block-capitola-footer__contact-link --email" href="mailto:<?= esc_attr( $capitola_contact_info['email'] ); ?>"><?= esc_html( $capitola_contact_info['email'] ); ?></a>
				<?php endif; ?>
			</div>
			<?php
			if ( $attributes['showHours'] ) :
				$capitola_opening_hours = get_option( 'capitola_hours' );
				?>
				<ul class="wp-block-capitola-footer__hours">
					<?php foreach ( $capitola_opening_hours as $capitola_day => $capitola_hours ) : ?>
						<li>
							<strong><?= esc_html( $capitola_day ); ?>:</strong>
							<span><?= ( $capitola_hours ? esc_html( $capitola_hours ) : 'Closed' ); ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<?php
			$capitola_socials = get_option( 'capitola_social_links' );
			if ( $attributes['showSocials'] && array_filter( $capitola_socials ) ) :
				?>
				<ul class="wp-block-capitola-footer__social-links">
					<?php foreach ( $capitola_socials as $capitola_slug => $capitola_url ) : ?>
						<?php if ( $capitola_url ) : ?>
							<li>
								<a class="wp-block-capitola-footer__social-link --<?= esc_attr( $capitola_slug ); ?>" href="<?= esc_url( $capitola_url ); ?>" target="_blank" aria-label="<?= esc_attr( $capitola_slug ); ?>"></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</div>
	</div>
	<div class="wp-block-capitola-footer__copyright">
		&copy;<?= esc_html( date( 'Y' ) . ', ' . get_bloginfo( 'name' ) ); ?>
	</div>
</div>
<?php

if ( $attributes['showCookieBanner'] ) :
	?>
	<div id="js-cookieConsent" class="capitola-cookie-consent --is-hidden is-layout-constrained has-global-padding --theme-<?= esc_attr( $attributes['cookieBannerTheme'] ); ?>">
		<div class="capitola-cookie-consent__body alignwide">
			<p class="capitola-cookie-consent__notice">
				<?= wp_kses_post( $attributes['cookieBannerText'] ); ?>
			</p>
			<?php if ( $attributes['cookieBannerCloseText'] ) : ?>
				<button id="js-cookieConsentCTA" class="capitola-cookie-consent__cta --cta js-closeConsent"><?= esc_html( $attributes['cookieBannerCloseText'] ); ?></button>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>
