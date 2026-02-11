// Ensure GSAP is included in your project
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

class revealAnimations {
	constructor() {
		gsap.utils.toArray( '.js-revealAnimation' ).forEach( ( section ) => {
			const startTranslate = section.dataset.startTranslate;
			const endTranslate = section.dataset.endTranslate;
			gsap.fromTo(
				section,
				{
					transform: startTranslate,
					opacity: 0,
				},
				{
					transform: endTranslate,
					opacity: 1,
					duration: 1,
					scrollTrigger: {
						trigger: section,
						start: 'top 80%', // Adjust based on when you want the animation to start
						//end,
						toggleActions: 'play none none reverse',
					},
				}
			);
		} );
	}
}

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

new revealAnimations();

new parallaxAnimations();
