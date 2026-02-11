import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

class anchorBar {
	constructor( element ) {
		const links = element.querySelectorAll( '.wp-block-capitola-anchor-nav__link' );
		const targets = [];

		links.forEach( ( link ) => {
			const href = link.getAttribute( 'href' );
			if ( ! href || ! href.startsWith( '#' ) ) {
				return;
			}
			const target = document.querySelector( href );
			if ( ! target ) {
				return;
			}
			targets.push( target );

			ScrollTrigger.create( {
				trigger: target,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => {
					links.forEach( ( l ) => {
						return l.classList.remove( '--current' );
					} );
					link.classList.add( '--current' );
				},
				onEnterBack: () => {
					links.forEach( ( l ) => {
						return l.classList.remove( '--current' );
					} );
					link.classList.add( '--current' );
				},
			} );
		} );
		if ( targets.length ) {
			ScrollTrigger.create( {
				trigger: targets[ targets.length - 1 ],
				end: 'bottom center',
				onLeave: () => {
					links.forEach( ( l ) => {
						return l.classList.remove( '--current' );
					} );
				},
			} );
		}
	}
}

const elements = document.querySelectorAll( '.js-anchorBar' );

elements.forEach( ( element ) => {
	new anchorBar( element );
} );
