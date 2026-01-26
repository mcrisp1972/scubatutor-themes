class accordion {
	constructor( wrapper ) {
		this.wrapper = wrapper;
		const data = wrapper.dataset;

		this.settings = {
			keepOpen: false,
			...data,
		};
		this.wrapper.addEventListener( 'click', this.toggleAccordion.bind( this ) );
	}

	toggleAccordion( event ) {
		if ( event.target.classList.contains( 'js-accordion-toggle' ) ) {
			//event.preventDefault();
			//event.target.blur();
			const section = event.target.closest( '.js-accordion-section' );
			if ( section.classList.contains( '--open' ) ) {
				section.classList.remove( '--open' );
			} else {
				if ( ! this.settings.keepOpen ) {
					const opened = this.wrapper.querySelector( '.--open' );
					if ( opened ) {
						opened.classList.remove( '--open' );
					}
				}
				section.classList.add( '--open' );
			}
		}
	}
}

const blocks = document.querySelectorAll( '.js-accordion-wrap' );

if ( blocks ) {
	blocks.forEach( ( block ) => {
		new accordion( block );
	} );
}
