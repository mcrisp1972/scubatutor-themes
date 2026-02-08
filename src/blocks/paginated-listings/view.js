import filteredListings from '../../scripts/modules/filtered-listings';

class filteredListingsToggles {
	constructor( wrapper ) {
		this.filters = wrapper.querySelector( '.js-filters' );
		wrapper.querySelectorAll( '.js-toggleFilters' ).forEach( ( element ) => {
			element.addEventListener( 'click', this.toggleVisible.bind( this ) );
		} );
	}

	toggleVisible() {
		this.filters.classList.toggle( '--open-filters' );
	}
}

window.addEventListener( 'DOMContentLoaded', () => {
	const listingContainerElement = document.querySelectorAll( '.js-paginatedListings' );
	if ( listingContainerElement ) {
		listingContainerElement.forEach( ( element ) => {
			new filteredListingsToggles( element );
			new filteredListings( element );
		} );
	}
} );
