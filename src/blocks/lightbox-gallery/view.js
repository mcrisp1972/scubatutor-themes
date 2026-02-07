import Swiper from 'swiper';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';

class lightboxGallery {
	constructor( wrapper ) {
		this.mainImageButton = wrapper.querySelector( '.js-largeImageLink' );
		this.mainImage = wrapper.querySelector( '.js-largeImageLink img' );
		this.thumbs = wrapper.querySelector( '.js-lightboxThumbs' );
		this.index = 0;
		if ( this.mainImageButton ) {
			this.mainImageButton.addEventListener( 'click', this.openLightbox.bind( this ) );
		}
		this.thumbImages = wrapper.querySelectorAll( '.js-thumbImageLink' );
		if ( this.thumbImages ) {
			this.thumbImages.forEach( ( image ) => {
				image.addEventListener( 'click', this.updateImage.bind( this ) );
			} );
		}
		// eslint-disable-next-line no-undef
		this.images = lightboxGalleryImages;
	}

	closeModal() {
		const m = document.getElementById( 'js-lighboxModal' );
		m.parentNode.removeChild( m );
	}

	updateImage = function ( e ) {
		const clicked = e.currentTarget;
		this.index = clicked.dataset.index;
		this.mainImage.classList.add( '--fade-out' );
		setTimeout( () => {
			this.mainImage.src = this.images[ this.index ].medSrc;
			this.mainImage.removeAttribute( 'srcset' );
			this.mainImage.removeAttribute( 'sizes' );
			this.mainImage.alt = this.images[ this.index ].alt;
			this.mainImage.classList.remove( '--fade-out' );
		}, 500 );
		this.thumbs.querySelector( '.--is-selected' ).classList.remove( '--is-selected' );
		clicked.classList.add( '--is-selected' );
	};

	openLightbox = function () {
		const elem = `
      <div id="js-lighboxModal" class="wp-block-capitola-lightbox-gallery__lightbox">
        <button type="button" class="wp-block-capitola-lightbox-gallery__lightbox-close js-close" aria-label="Close Lightbox"></button>
        <div class="wp-block-capitola-lightbox-gallery__lightbox-content swiper js-lightboxContent">
          <div class="wp-block-capitola-lightbox-gallery__lightbox-slides swiper-wrapper">
            ${ this.images
				.map( ( image ) => {
					return `
                  <figure class="wp-block-capitola-lightbox-gallery__lightbox-grid swiper-slide">
                    <div class="wp-block-capitola-lightbox-gallery__lightbox-img-wrap">
                      <img src="${ image.largeSrc }" alt="${ image.alt }">
                    </div>
                    <figcaption class="wp-block-capitola-lightbox-gallery__lightbox-caption">${ image.caption }</figcaption>
                  </figure>
                  `;
				} )
				.join( '' ) }
          </div>
          <div class="wp-block-capitola-lightbox-gallery__lightbox-nav">
            <button type="button" class="wp-block-capitola-lightbox-gallery__lightbox-nav-prev swiper-button-prev" aria-label="Previous"></button>
            <div class="wp-block-capitola-lightbox-gallery__lightbox-page-count swiper-pagination"></div>
            <button type="button" class="wp-block-capitola-lightbox-gallery__lightbox-nav-next swiper-button-next" aria-label="Next"></button>
          </div>
        </div>
      </div>`;

		const dom = document.createRange().createContextualFragment( elem );
		dom.querySelector( '.js-close' ).addEventListener( 'click', this.closeModal );
		document.body.appendChild( dom );

		new Swiper( document.body.querySelector( '.js-lightboxContent' ), {
			modules: [ Pagination, Navigation, EffectFade ],
			grabCursor: true,
			speed: 600,
			loop: true,
			initialSlide: this.index,
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'custom',
				renderCustom( swiper, current, total ) {
					return current + ' / ' + total;
				},
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		} );
	};
}

const block = document.querySelector( '.js-lightboxGallery' );

if ( block ) {
	new lightboxGallery( block );
}
