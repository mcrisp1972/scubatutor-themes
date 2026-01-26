import Swiper from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Navigation, Pagination, Thumbs, Autoplay, EffectFade, EffectCreative } from 'swiper/modules';

class fullWidthSlider {
	constructor( slider ) {
		const main = slider.querySelector( '.js-mainSlider' );
		const thumbs = slider.querySelector( '.js-sliderThumbs' );
		const autoplay = main.dataset.autoplay;
		const navigation = main.dataset.navigation;
		const transition = main.dataset.transition;
		const slideCount = thumbs ? thumbs.querySelector( '.swiper-wrapper' ).childElementCount : '';

		if ( thumbs ) {
			// eslint-disable-next-line no-var
			var thumbSwiper = new Swiper( thumbs, {
				modules: [ Pagination ],
				slidesPerView: slideCount < 6 ? slideCount : 6,
				loop: true,
				grabCursor: true,
			} );
		}

		new Swiper( main, {
			modules: [ Navigation, Pagination, Thumbs, Autoplay, EffectFade, EffectCreative ],
			loop: true,
			spaceBetween: 0,
			speed: transition === 'fade' ? 2000 : 600,
			grabCursor: transition === 'fade' ? false : true,
			slidesPerView: 1,
			navigation:
				navigation === 'arrows'
					? {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
					  }
					: false,
			pagination:
				navigation === 'bullets'
					? {
							el: '.swiper-pagination',
							clickable: true,
					  }
					: false,
			autoplay: autoplay
				? {
						delay: 6000,
				  }
				: false,
			effect: transition === 'fade' ? 'fade' : transition === 'stack' ? 'creative' : 'slide',
			creativeEffect:
				transition === 'stack'
					? {
							prev: {
								shadow: true,
								translate: [ '-20%', 0, -1 ],
							},
							next: {
								translate: [ '100%', 0, 0 ],
							},
					  }
					: false,
			fadeEffect:
				transition === 'fade'
					? {
							crossFade: true,
					  }
					: false,
			thumbs: {
				swiper: thumbSwiper,
			},
		} );
	}
}

document.querySelectorAll( '.js-fullWidthSlider' ).forEach( ( slider ) => {
	new fullWidthSlider( slider );
} );
