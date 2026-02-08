import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

class listingSidescroll {
	constructor( wrapper ) {
		const swiperContainer = wrapper.querySelector( '.swiper' );
		this.swiper = new Swiper( swiperContainer, {
			modules: [ Navigation, Pagination ],
			speed: 800,
			navigation: {
				nextEl: wrapper.querySelector( '.swiper-button-next' ),
				prevEl: wrapper.querySelector( '.swiper-button-prev' ),
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'custom',
				renderCustom( swiper, current, total ) {
					return current + ' of ' + total;
				},
			},
			slidesPerGroup: 1,
			slidesPerGroupAuto: true,
			slidesPerView: 'auto',
		} );
	}
}

document.querySelectorAll( '.js-sidescroll-list' ).forEach( ( slider ) => {
	new listingSidescroll( slider );
} );
