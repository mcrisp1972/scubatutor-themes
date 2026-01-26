import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

class parallaxAnimations {
	constructor() {
		gsap.utils.toArray( '.js-imgParallax img' ).forEach( ( section ) => {
			gsap.fromTo(
				section,
				{
					y: section.parentElement.offsetHeight - section.offsetHeight,
				},
				{
					y: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: section.parentElement,
						scrub: true,
					},
				}
			);
		} );

		// gsap.to('img', {
		//   scale: 1.5,
		//   duration: 1,
		//   scrollTrigger: {
		//     trigger: 'img',
		//     markers: true,
		//     scrub: true,
		//     start: 'bottom bottom'
		//   }
		// })
	}
}

new parallaxAnimations();
