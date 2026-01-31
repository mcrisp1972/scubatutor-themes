<?php

$contact_info = get_option( 'cwps_contact' );
$contact_phone = $contact_info['phone'];

$attributes = \cwps\helpers\blockAttributes\alternate_theme( $attributes, 'headerTheme' );

$logo_object = $attributes['logo'] ? wp_get_attachment_metadata( $attributes['logo'] ) : false;

$myaccount_page_id = get_option( 'woocommerce_myaccount_page_id' );

if ( $myaccount_page_id ) {
	$myaccount_page_url = get_permalink( $myaccount_page_id );
}

$banner = get_option( 'cwps_notice_banner' );

if ( CAPITOLA_WOO_ACTIVE ) {
	$cart = WC()->cart;
	$cart_count = WC()->cart ? $cart->get_cart_contents_count() : 0;
	remove_filter( 'the_title', 'wc_page_endpoint_title' );
}

if ( CAPITOLA_WOO_ACTIVE ) {
	add_filter( 'the_title', 'wc_page_endpoint_title' );
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $attributes['stickyStyle'],
		'style' => '--cwps-dropdownSpeed: ' . $attributes['dropdownSpeed'] . 's;',
		'data-wp-interactive' => 'cwps-nav',
		'data-wp-init' => 'callbacks.init',
		'data-wp-on-window--resize' => 'actions.handleResize',
		'data-wp-on-document--scroll' => 'actions.handleScroll',
		'data-wp-class----sticky-nav' => 'state.isSticky',
		'data-wp-class----is-shown' => 'state.mobileNavOpen',
		'data-wp-on--keydown' => 'actions.handleFocusTrapKeydown',
		'data-wp-watch' => 'callbacks.watchMobileNavOpen',
	)
);

?>
<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?php if ( $banner['display'] && $banner['message'] ) : ?>
		<div id="js-headerBanner" class="wp-block-cwps-nav__banner alignfull is-layout-constrained has-global-padding --theme-<?= esc_attr( $banner['type'] ) ?>" data-wp-class----is-hidden="!state.showBanner">
			<div class="wp-block-cwps-nav__banner-body alignwide">
				<div class="wp-block-cwps-nav__banner-notice">
					<?= wp_kses_post( $banner['message'] ) ?>
				</div>
				<button aria-label="close alert banner" class="wp-block-cwps-nav__banner-close" type="button" data-wp-on--click="actions.hideBanner"></button>
			</div>
		</div>
	<?php endif; ?>

	<nav class="wp-block-cwps-nav__background alignfull is-layout-constrained has-global-padding  --theme-<?= esc_attr( $attributes['colorTheme'] ) ?>">
		<div class="wp-block-cwps-nav__grid alignwide">
			<?php if ( ! empty( $logo_object ) ) : ?>
				<?php if ( str_starts_with( $logo_object['sizes']['medium']['mime-type'], 'image/svg' ) && ! $attributes['useLogoColor'] ) : ?>
					<a class="wp-block-cwps-nav__logo --has-svg-mask js-trapMobile" href="<?= esc_url( get_home_url() ) ?>" style="aspect-ratio: <?= esc_attr( $logo_object['width'] . '/' . $logo_object['height'] ) ?>;--mask-image: url(<?= esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ) ?>);" aria-label="home">
						<img src="<?= esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ) ?>" class="custom-logo" alt="<?= esc_attr( get_bloginfo( 'name', 'display' ) ) ?>" height="<?= esc_attr( $logo_object['height'] ) ?>" width="<?= esc_attr( $logo_object['width'] ) ?>"/>
					</a>
				<?php else : ?>
					<a class="wp-block-cwps-nav__logo js-trapMobile" href="<?= esc_url( get_home_url() ) ?>" aria-label="home">
						<img src="<?= esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ) ?>" class="custom-logo" alt="<?= esc_attr( get_bloginfo( 'name', 'display' ) ) ?>"/>
					</a>
				<?php endif; ?>
			<?php endif; ?>
			<div class="wp-block-cwps-nav__menu" data-wp-bind--inert="state.mobileMenuInert">
				<div class="search-modal" data-wp-class----is-open="state.searchOpen" data-wp-watch="callbacks.watchSearchOpen" data-wp-on--keydown="actions.handleFocusTrapKeydown" data-wp-bind--inert="state.searchModalInert">
					<div class="search-modal__width">
						<button class="search-modal__close js-trapSearch" type="button" aria-label="close search form" data-wp-on--click="actions.closeSearch"></button>
						<div class="search-modal__headline --hl-xl">Search</div>
						<form action="/" autocomplete="off">
							<input type="search" name="s" aria-label="search" placeholder="What are you looking for?"/>
							<button type="submit" class="search-icon js-trapSearch" aria-label="submit search"></button>
						</form>
					</div>
				</div>
				<ul class="wp-block-cwps-nav__utility-menu">
					<?php foreach ( $attributes['utilityLinks'] as $item ) : ?>
						<?php if ( ! empty( $item['link']['url'] ) ) : ?>
							<li class="wp-block-cwps-nav__utility-menu-item">
								<a class="wp-block-cwps-nav__utility-menu-item-link" href="<?= esc_url( $item['link']['url'] ) ?>"<?= ( ! empty( $item['link']['opensInNewtab'] ) ? ' target="_blank"' : '' ) ?>><?= esc_html( $item['title'] ) ?></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
					<?php if ( $attributes['showPhoneLink'] ) : ?>
						<li class="wp-block-cwps-nav__utility-menu-item">
							<a href="tel:<?= esc_attr( \cwps\helpers\stringHelpers\phone_link_number( $contact_phone ) ) ?>" class="wp-block-cwps-nav__utility-menu-item-link --phone"><?= esc_html( $contact_phone ) ?></a>
						</li>
					<?php endif; ?>
					<?php if ( $attributes['showAccountIcon'] && CAPITOLA_WOO_ACTIVE ) : ?>
						<li class="wp-block-cwps-nav__utility-menu-item">
							<a href="<?= esc_url( $myaccount_page_url ) ?>" class="wp-block-cwps-nav__utility-menu-item-link --account">Account</a>
						</li>
					<?php endif; ?>
					<?php if ( $attributes['showCartIcon'] && CAPITOLA_WOO_ACTIVE && ( ! is_cart() && ! is_checkout() && WC()->cart->get_cart_contents_count() ) ) : ?>
						<li class="wp-block-cwps-nav__utility-menu-item">
							<?php
								echo wp_kses_post(
									render_block(
										array(
											'blockName' => 'woocommerce/mini-cart',
											'attrs' => array(),
										)
									)
								);
							?>
						</li>
					<?php endif; ?>
				</ul>
				<ul class="wp-block-cwps-nav__menu-items" data-wp-on--click="actions.toggleSubmenu">
					<?= wp_kses_post( $content ) ?>
					<li class="wp-block-cwps-nav__menu-item">
						<button class="wp-block-cwps-nav__search-trigger" type="button" aria-label="open search" data-wp-on--click="actions.openSearch"></button>
					</li>
				</ul>
			</div>
			<button class="wp-block-cwps-nav__hamburger js-trapMobile" type="button" aria-label="toggle navigation" data-wp-on--click="actions.toggleMobileNav" data-wp-class----is-active="state.mobileNavOpen">
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</nav>
</div>
