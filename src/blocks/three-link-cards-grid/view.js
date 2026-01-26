import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

class ThreeLinkCardsGridView {
	constructor( wrapper ) {
		const cards = wrapper.querySelectorAll( '.js-threeLinkCard' );
		cards.forEach( ( card ) => {
			gsap.to( card, {
				translateY: '0px',
				ease: 'none',
				scrollTrigger: {
					trigger: wrapper,
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: true,
				},
			} );
		} );
	}
}

const blocks = document.querySelectorAll( '.js-threeCardParallax' );

blocks.forEach( ( element ) => {
	new ThreeLinkCardsGridView( element );
} );
