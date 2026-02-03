<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\phone_link_number;
use function Capitola\Helpers\Block_Attributes\alternate_theme;

$capitola_contact_info  = get_option( 'capitola_contact' );
$capitola_contact_phone = $capitola_contact_info['phone'];

// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
$attributes = alternate_theme( $attributes, 'headerTheme' );

$capitola_logo_object = $attributes['logo'] ? wp_get_attachment_metadata( $attributes['logo'] ) : false;

$capitola_myaccount_page_id = get_option( 'woocommerce_myaccount_page_id' );

if ( $capitola_myaccount_page_id ) {
	$capitola_myaccount_page_url = get_permalink( $capitola_myaccount_page_id );
}

$capitola_banner = get_option( 'capitola_notice_banner' );

if ( CAPITOLA_WOO_ACTIVE ) {
	$capitola_cart       = WC()->cart;
	$capitola_cart_count = WC()->cart ? $capitola_cart->get_cart_contents_count() : 0;
	remove_filter( 'the_title', 'wc_page_endpoint_title' );
}

if ( CAPITOLA_WOO_ACTIVE ) {
	add_filter( 'the_title', 'wc_page_endpoint_title' );
}

?>
<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class'                       => $attributes['stickyStyle'],
			'style'                       => '--capitola-dropdownSpeed: ' . $attributes['dropdownSpeed'] . 's;',
			'data-wp-interactive'         => 'capitola-nav',
			'data-wp-init'                => 'callbacks.init',
			'data-wp-on-window--resize'   => 'actions.handleResize',
			'data-wp-on-document--scroll' => 'actions.handleScroll',
			'data-wp-class----sticky-nav' => 'state.isSticky',
			'data-wp-class----is-shown'   => 'state.mobileNavOpen',
			'data-wp-on--keydown'         => 'actions.handleFocusTrapKeydown',
			'data-wp-watch'               => 'callbacks.watchMobileNavOpen',
		)
	)
);
?>
>
	<?php if ( $capitola_banner['display'] && $capitola_banner['message'] ) : ?>
		<div id="js-headerBanner" class="wp-block-capitola-nav__banner alignfull is-layout-constrained has-global-padding --theme-<?php echo esc_attr( $capitola_banner['type'] ); ?>" data-wp-class----is-hidden="!state.showBanner">
			<div class="wp-block-capitola-nav__banner-body alignwide">
				<div class="wp-block-capitola-nav__banner-notice">
					<?php echo wp_kses_post( $capitola_banner['message'] ); ?>
				</div>
				<button aria-label="close alert banner" class="wp-block-capitola-nav__banner-close" type="button" data-wp-on--click="actions.hideBanner"></button>
			</div>
		</div>
	<?php endif; ?>

	<nav class="wp-block-capitola-nav__background alignfull is-layout-constrained has-global-padding  --theme-<?php echo esc_attr( $attributes['colorTheme'] ); ?>">
		<div class="wp-block-capitola-nav__grid alignwide">
			<?php if ( ! empty( $capitola_logo_object ) ) : ?>
				<?php if ( str_starts_with( $capitola_logo_object['sizes']['medium']['mime-type'], 'image/svg' ) && ! $attributes['useLogoColor'] ) : ?>
					<a class="wp-block-capitola-nav__logo --has-svg-mask js-trapMobile" href="<?php echo esc_url( get_home_url() ); ?>" style="aspect-ratio: <?php echo esc_attr( $capitola_logo_object['width'] . '/' . $capitola_logo_object['height'] ); ?>;--mask-image: url(<?php echo esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ); ?>);" aria-label="home">
						<img src="<?php echo esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ); ?>" class="custom-logo" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" height="<?php echo esc_attr( $capitola_logo_object['height'] ); ?>" width="<?php echo esc_attr( $capitola_logo_object['width'] ); ?>"/>
					</a>
				<?php else : ?>
					<a class="wp-block-capitola-nav__logo js-trapMobile" href="<?php echo esc_url( get_home_url() ); ?>" aria-label="home">
						<img src="<?php echo esc_url( wp_get_attachment_image_url( $attributes['logo'], 'medium' ) ); ?>" class="custom-logo" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"/>
					</a>
				<?php endif; ?>
			<?php endif; ?>
			<div class="wp-block-capitola-nav__menu" data-wp-bind--inert="state.mobileMenuInert">
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
				<ul class="wp-block-capitola-nav__utility-menu">
					<?php foreach ( $attributes['utilityLinks'] as $capitola_item ) : ?>
						<?php if ( ! empty( $capitola_item['link']['url'] ) ) : ?>
							<li class="wp-block-capitola-nav__utility-menu-item">
								<a class="wp-block-capitola-nav__utility-menu-item-link" href="<?php echo esc_url( $capitola_item['link']['url'] ); ?>"<?php echo ( ! empty( $capitola_item['link']['opensInNewtab'] ) ? ' target="_blank"' : '' ); ?>><?php echo esc_html( $capitola_item['title'] ); ?></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
					<?php if ( $attributes['showPhoneLink'] ) : ?>
						<li class="wp-block-capitola-nav__utility-menu-item">
							<a href="tel:<?php echo esc_attr( phone_link_number( $capitola_contact_phone ) ); ?>" class="wp-block-capitola-nav__utility-menu-item-link --phone"><?php echo esc_html( $capitola_contact_phone ); ?></a>
						</li>
					<?php endif; ?>
					<?php if ( $attributes['showAccountIcon'] && CAPITOLA_WOO_ACTIVE ) : ?>
						<li class="wp-block-capitola-nav__utility-menu-item">
							<a href="<?php echo esc_url( $capitola_myaccount_page_url ); ?>" class="wp-block-capitola-nav__utility-menu-item-link --account">Account</a>
						</li>
					<?php endif; ?>
					<?php if ( $attributes['showCartIcon'] && CAPITOLA_WOO_ACTIVE && ( ! is_cart() && ! is_checkout() && WC()->cart->get_cart_contents_count() ) ) : ?>
						<li class="wp-block-capitola-nav__utility-menu-item">
							<?php
								echo wp_kses_post(
									render_block(
										array(
											'blockName' => 'woocommerce/mini-cart',
											'attrs'     => array(),
										)
									)
								);
							?>
						</li>
					<?php endif; ?>
				</ul>
				<ul class="wp-block-capitola-nav__menu-items" data-wp-on--click="actions.toggleSubmenu">
					<?php echo wp_kses_post( $content ); ?>
					<li class="wp-block-capitola-nav__menu-item">
						<button class="wp-block-capitola-nav__search-trigger" type="button" aria-label="open search" data-wp-on--click="actions.openSearch"></button>
					</li>
				</ul>
			</div>
			<button class="wp-block-capitola-nav__hamburger js-trapMobile" type="button" aria-label="toggle navigation" data-wp-on--click="actions.toggleMobileNav" data-wp-class----is-active="state.mobileNavOpen">
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</nav>
</div>
