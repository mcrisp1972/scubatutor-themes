import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

class StickyImageScroller {
	constructor( container ) {
		this.root = container;
		this.sections = container.querySelectorAll( '.js-stickyImagesSection' );
		this.images = container.querySelectorAll( '.js-stickyImagesImage' );

		this.sections.forEach( ( section, idx ) => {
			ScrollTrigger.create( {
				trigger: section,
				start: 'top 50%',
				end: 'bottom 50%',
				onToggle: ( self ) => {
					if ( self.isActive ) {
						this.images.forEach( ( img, i ) => {
							if ( i === idx ) {
								gsap.to( img, {
									autoAlpha: 1,
									duration: 0.5,
									overwrite: true,
								} );
							} else {
								gsap.to( img, {
									autoAlpha: 0,
									duration: 0.3,
									overwrite: true,
								} );
							}
						} );
					}
				},
			} );
		} );
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	const stickyImageSlider = document.querySelectorAll( '.js-stickyImageScroller' );
	stickyImageSlider.forEach( ( container ) => {
		new StickyImageScroller( container );
	} );
} );
