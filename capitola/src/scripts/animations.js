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

new parallaxAnimations();

new animationStateClasses();
