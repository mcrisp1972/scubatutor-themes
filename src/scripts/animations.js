// Ensure GSAP is included in your project
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

// class revealAnimations {
// 	constructor() {
// 		const easingMap = {
// 			linear: 'none',
// 			ease: 'power1.out',
// 			'ease-in': 'power1.in',
// 			'ease-out': 'power1.out',
// 			'ease-in-out': 'power1.inOut',
// 		};

// 		gsap.utils.toArray( '.js-revealAnimation' ).forEach( ( section ) => {
// 			const startTranslate = section.dataset.gsapStartTranslate || 'translateY(0)';
// 			const endTranslate = section.dataset.gsapEndTranslate || 'translate(0)';
// 			const duration = Number.parseFloat( section.dataset.gsapDuration ?? '1' );
// 			const easing = section.dataset.gsapEasing || 'ease';
// 			gsap.fromTo(
// 				section,
// 				{
// 					transform: startTranslate,
// 					opacity: 0,
// 				},
// 				{
// 					transform: endTranslate,
// 					opacity: 1,
// 					duration,
// 					ease: easingMap[ easing ] || easing,
// 					scrollTrigger: {
// 						trigger: section,
// 						start: 'top 80%', // Adjust based on when you want the animation to start
// 						//end,
// 						toggleActions: 'play none none reverse',
// 					},
// 				}
// 			);
// 		} );
// 	}
// }

class parallaxAnimation {
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
	}
}

class zoomAnimation {
	constructor() {
		gsap.utils.toArray( '.js-imgZoom img' ).forEach( ( image ) => {
			const wrapper = image.parentElement;
			const zoomEnd = '1.3';

			gsap.fromTo(
				image,
				{
					scale: 1,
				},
				{
					scale: zoomEnd,
					ease: 'none',
					scrollTrigger: {
						trigger: wrapper,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				}
			);
		} );
	}
}

class animationStateClasses {
	constructor() {
		gsap.utils.toArray( '.js-revealAnimation' ).forEach( ( section ) => {
			ScrollTrigger.create( {
				trigger: section,
				start: 'top 80%',
				onEnter: () => {
					return section.classList.add( '--is-animated' );
				},
			} );
		} );
	}
}

//new revealAnimations();

new parallaxAnimation();

new zoomAnimation();

new animationStateClasses();
