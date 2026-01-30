import Cookies from '../../../../crisp-base-theme/src/scripts/modules/cookies';

class cookieConsent {
	constructor() {
		this.cookies = new Cookies();
		this.show_consent = ! this.cookies.getCookie( 'hide_consent' );

		if ( this.show_consent ) {
			this.bar = document.getElementById( 'js-cookieConsent' );
			if ( this.bar ) {
				this.cta = document.getElementById( 'js-cookieConsentCTA' );
				this.bar.classList.remove( '--is-hidden' );

				if ( this.cta ) {
					this.cta.addEventListener( 'click', this.hideNotice.bind( this ) );
				}
			}
		}
	}

	hideNotice() {
		this.cookies.setCookie( 'hide_consent', true, 365 );
		this.bar.classList.add( '--is-hidden' );
	}
}

new cookieConsent();
