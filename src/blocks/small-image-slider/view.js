import Swiper from 'swiper';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';

class smallImageSlider {
	constructor( slider ) {
		const swiperWrap = slider.closest( '.wp-block-capitola-small-image-slider' );
		const swiperMain = slider;

		this.swiper = new Swiper( swiperMain, {
			modules: [ Navigation, EffectCoverflow, Autoplay ],
			grabCursor: true,
			autoplay: swiperMain.dataset.autoplay
				? {
						delay: 5000,
				  }
				: false,
			speed: 600,
			loop: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				addIcons: false,
			},
			on: {
				slideChange: () => {
					if ( this.swiper ) {
						const current = this.swiper.slides[ this.swiper.realIndex ];
						const caption = current.dataset.caption;
						const captionContainer = swiperWrap.querySelector(
							'.wp-block-capitola-small-image-slider__caption'
						);
						const span = document.createElement( 'span' );
						span.innerText = caption;
						captionContainer.replaceChildren( span );
					}
				},
			},
		} );
	}
}

const blocks = document.querySelectorAll( '.wp-block-capitola-small-image-slider .swiper' );

if ( blocks ) {
	blocks.forEach( ( block ) => {
		new smallImageSlider( block );
	} );
}
