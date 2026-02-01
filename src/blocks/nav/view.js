import Cookies from '../../scripts/modules/cookies';

import { store, getContext, getElement } from '@wordpress/interactivity';

const cookies = new Cookies();

function isMobileNav() {
	const isMobile = window.innerWidth < 960;
	return isMobile;
}

const cache = {
	alertBar: null,
	navBlock: null,
};

// Single active focus trap array
let activeFocusTrap = [];

/**
 * Reusable focus trap handler
 * @param {KeyboardEvent} event
 */
function handleFocusTrap( event ) {
	if ( event.key !== 'Tab' || activeFocusTrap.length === 0 ) {
		return;
	}

	const firstFocusable = activeFocusTrap[ 0 ];
	const lastFocusable = activeFocusTrap[ activeFocusTrap.length - 1 ];

	if ( event.shiftKey ) {
		if ( event.target === firstFocusable ) {
			event.preventDefault();
			lastFocusable.focus();
		}
	} else if ( event.target === lastFocusable ) {
		event.preventDefault();
		firstFocusable.focus();
	}
}

const { state } = store( 'capitola-nav', {
	state: {
		showBanner: ! cookies.getCookie( 'hide_banner' ),
		searchOpen: false,
		isMobile: false,
		isSticky: false,
		mobileNavOpen: false,
		openSubmenuId: null,
		get mobileMenuInert() {
			return state.isMobile && ! state.mobileNavOpen;
		},
		get searchModalInert() {
			return ! state.searchOpen && ! state.mobileNavOpen;
		},
	},
	actions: {
		hideBanner() {
			cookies.setCookie( 'hide_banner', true, 7 );
			state.showBanner = false;
			cache.alertBar = null;
		},
		handleResize() {
			const isNowMobile = isMobileNav();
			if ( isNowMobile !== state.isMobile ) {
				state.isMobile = isNowMobile;
				state.openSubmenuId = null;
				if ( ! isNowMobile && state.mobileNavOpen ) {
					state.mobileNavOpen = false;
				}
			}
		},
		openSearch( event ) {
			event.stopPropagation();
			state.searchOpen = true;
		},
		closeSearch() {
			state.searchOpen = false;
		},
		handleScroll() {
			const alertHeight = cache.alertBar?.offsetHeight ?? 0;
			const stickyThreshold = 100;

			state.isSticky = window.pageYOffset >= stickyThreshold + alertHeight;
		},
		toggleMobileNav() {
			state.mobileNavOpen = ! state.mobileNavOpen;
			if ( ! state.mobileNavOpen ) {
				state.openSubmenuId = null;
			}
		},
		// Single consolidated focus trap handler
		handleFocusTrapKeydown( event ) {
			handleFocusTrap( event );
		},
		toggleSubmenu() {
			const context = getContext();
			if ( ! context || context.isSubmenuOpen === undefined ) {
				return;
			}

			if ( context.isSubmenuOpen ) {
				context.isSubmenuOpen = false;
				state.openSubmenuId = null;
			} else {
				state.openSubmenuId = context.submenuId;
				context.isSubmenuOpen = true;
			}
		},
	},
	callbacks: {
		init() {
			const { ref } = getElement();
			cache.navBlock = ref;
			state.isMobile = isMobileNav();
			cache.alertBar = ref.querySelector( '#js-headerBanner' );
		},
		watchSearchOpen() {
			if ( state.searchOpen ) {
				const { ref } = getElement();
				activeFocusTrap = Array.from( cache.navBlock.querySelectorAll( '.js-trapSearch' ) );
				ref.querySelector( '.search-modal input[type=search]' ).focus();
			} else {
				activeFocusTrap = [];
			}
		},
		watchMobileNavOpen() {
			if ( state.mobileNavOpen ) {
				activeFocusTrap = Array.from( cache.navBlock.querySelectorAll( '.js-trapMobile' ) );
				requestAnimationFrame( () => {
					activeFocusTrap[ 0 ]?.focus();
				} );
			} else if ( ! state.searchOpen ) {
				activeFocusTrap = [];
			}
		},
		watchOpenSubmenu() {
			const context = getContext();
			if ( context.isSubmenuOpen && state.openSubmenuId !== context.submenuId ) {
				context.isSubmenuOpen = false;
			}
		},
	},
} );

window.updateCart = ( itemCount ) => {
	const carts = document.querySelectorAll( '.js-cartCount' );
	carts.forEach( ( cart ) => {
		cart.innerText = itemCount;
		cart.classList.add( '--has-items' );
	} );
};
