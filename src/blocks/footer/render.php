<?php

$contact_info = get_option( 'cwps_contact' );

$attributes = \Capitola\Helpers\Block_Attributes\alternate_theme( $attributes, 'footerTheme' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>

<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-cwps-footer__grid alignwide">
		<div class="wp-block-cwps-footer__menus">
			<?= wp_kses_post( $content ) ?>
		</div>
		<div class="wp-block-cwps-footer__contact">
			<div class="wp-block-cwps-footer__contact-info">
				<?php if ( $attributes['showBusinessName'] ) : ?>
					<div><?= esc_html( $contact_info['business_name'] ) ?></div>
				<?php endif; ?>
				<?php if ( $attributes['showAddress'] ) : ?>
					<div><?= esc_html( $contact_info['address'] ) ?></div>
				<?php endif; ?>
				<?php if ( $attributes['showMapLink'] ) : ?>
					<a class="wp-block-cwps-footer__contact-link --map" href="<?= esc_url( $contact_info['gmap_link'] ) ?>" target="_blank">Directions</a>
				<?php endif; ?>
				<?php if ( $attributes['showPhoneNumber'] ) : ?>
					<a class="wp-block-cwps-footer__contact-link --phone" href="tel:<?= esc_attr( \Capitola\Helpers\String_Helpers\phone_link_number( $contact_info['phone'] ) ) ?>"><?= esc_html( $contact_info['phone'] ) ?></a>
				<?php endif; ?>
				<?php if ( $attributes['showEmail'] ) : ?>
					<a class="wp-block-cwps-footer__contact-link --email" href="mailto:<?= esc_attr( $contact_info['email'] ) ?>"><?= esc_html( $contact_info['email'] ) ?></a>
				<?php endif; ?>
			</div>
			<?php
			if ( $attributes['showHours'] ) :
				$opening_hours = get_option( 'cwps_hours' );
				?>
				<ul class="wp-block-cwps-footer__hours">
					<?php foreach ( $opening_hours as $day => $hours ) : ?>
						<li>
							<strong><?= esc_html( $day ) ?>:</strong>
							<span><?= ( $hours ? esc_html( $hours ) : 'Closed' ) ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<?php
			$socials = get_option( 'cwps_social_links' );
			if ( $attributes['showSocials'] && array_filter( $socials ) ) :
				?>
				<ul class="wp-block-cwps-footer__social-links">
					<?php foreach ( $socials as $k => $v ) : ?>
						<?php if ( $v ) : ?>
							<li>
								<a class="wp-block-cwps-footer__social-link --<?= esc_attr( $k ) ?>" href="<?= esc_url( $v ) ?>" target="_blank" aria-label="<?= esc_attr( $k ) ?>"></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</div>
	</div>
	<div class="wp-block-cwps-footer__copyright">
		&copy;<?= esc_html( date( 'Y' ) . ', ' . get_bloginfo( 'name' ) ) ?>
	</div>
</div>
<?php

if ( $attributes['showCookieBanner'] ) :
	?>
	<div id="js-cookieConsent" class="cwps-cookie-consent --is-hidden is-layout-constrained has-global-padding --theme-<?= esc_attr( $attributes['cookieBannerTheme'] ) ?>">
		<div class="cwps-cookie-consent__body alignwide">
			<p class="cwps-cookie-consent__notice">
				<?= wp_kses_post( $attributes['cookieBannerText'] ) ?>
			</p>
			<?php if ( $attributes['cookieBannerCloseText'] ) : ?>
				<button id="js-cookieConsentCTA" class="cwps-cookie-consent__cta --cta js-closeConsent"><?= esc_html( $attributes['cookieBannerCloseText'] ) ?></button>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>
