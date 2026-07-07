/* eslint-disable no-console */
import { addQueryArgs } from '@wordpress/url';
import { layoutConditionals } from '@capitola/blocks/post-feed/layout-conditionals';

/**
 * Manages AJAX-powered filtered post/product listings with pagination.
 *
 * Reads block attributes from the global `listingAttributes` object, builds
 * WP REST API queries from form state and URL parameters, renders results into
 * the DOM, and keeps the browser URL in sync so filtered views are shareable.
 */
export default class filteredListings {
	/**
	 * @param {HTMLElement} listings - The root element of the listings block.
	 */
	constructor( listings ) {
		// eslint-disable-next-line no-undef
		this.attr = listingAttributes; // Block attributes injected by PHP via wp_localize_script
		this.urlParams = new URLSearchParams( window.location.search );
		this.elements = {
			parent: listings,
			navBar: listings.querySelector( '.js-pageNav' ),
			navNext: listings.querySelector( '.js-navNext' ),
			navPrevious: listings.querySelector( '.js-navPrev' ),
			navPageNumbers: listings.querySelector( '.js-navPageNumbers' ),
			list: listings.querySelector( '.js-list' ),
			filterForm: listings.querySelector( '#js-filterForm' ),
			baseFields: listings.querySelectorAll( '.js-filter' ),
			triggerFields: listings.querySelectorAll( '.js-autoFilter' ),
			searchFields: listings.querySelectorAll( '.js-searchField' ),
			formSubmit: listings.querySelectorAll( '.js-formSubmit' ),
			resultsCount: listings.querySelector( '.js-resultsCount' ),
		};
		this.setQueryParams();
		this.postType = this.attr.postType;
		this.numPages = 0; // Total pages returned by the last REST request
		this.numResults = 0; // Number of posts in the current page
		this.totalResults = 0; // Grand total across all pages
		this.elements.navBar.addEventListener( 'click', this.turnPage.bind( this ) );

		if ( this.elements.triggerFields ) {
			this.elements.triggerFields.forEach(
				function ( field ) {
					field.addEventListener( 'change', this.updateFilters.bind( this ) );
				}.bind( this )
			);
		}

		if ( this.elements.formSubmit ) {
			this.elements.formSubmit.forEach( ( button ) => {
				button.addEventListener( 'click', this.submitForm.bind( this ) );
			} );
		}

		this.setRestPath();
		this.getPosts();
	}

	/**
	 * Builds the initial `queryParams` object from block attributes, pre-set
	 * filter fields, an optional base taxonomy term, and any values already
	 * present in the page URL (so users can deep-link to filtered views).
	 */
	setQueryParams() {
		this.queryParams = {
			page: 1,
			per_page: parseInt( this.attr.limit ),
			orderby: this.attr.orderBy,
			order: this.attr.orderbyOptions[ this.attr.orderBy ].order,
		};

		this.elements.baseFields.forEach( ( field ) => {
			if ( this.isTaxonomyField( field.name ) ) {
				this.setTaxonomyQueryParameter( field );
			} else {
				this.queryParams[ field.name ] = field.value;
			}
		} );

		// Lock in a base taxonomy term when one is configured in the block settings
		if ( parseInt( this.attr.baseTerm ) ) {
			this.queryParams[ this.attr.taxParams[ this.attr.baseTaxonomy ] ] = [
				parseInt( this.attr.baseTerm ),
			];
		}

		// Restore filter state from the current URL so shared/bookmarked
		// URLs load with the correct filters already applied.
		for ( const [ key, value ] of this.urlParams.entries() ) {
			if ( key === 'page_num' ) {
				this.queryParams.page = value;
			} else {
				const field = this.elements.parent.querySelector(
					'.js-autoFilter[name="' + key + '"], .js-searchField[name="' + key + '"]'
				);

				if ( field ) {
					if ( field.type === 'checkbox' ) {
						const checkboxes = this.elements.parent.querySelectorAll(
							'.js-autoFilter[name="' + key + '"]'
						);
						const cbva = value.split( ',' );
						checkboxes.forEach( ( cb ) => {
							if ( cbva.includes( cb.value ) ) {
								cb.checked = true;
							}
						} );
						this.queryParams[ key ] = cbva;
					} else {
						field.value = value;
						this.queryParams[ key ] = value;
					}
				}
			}
		}
	}

	/**
	 * Returns true if the given field name maps to a registered taxonomy
	 * query parameter (e.g. the REST param for a custom taxonomy filter).
	 *
	 * @param {string} fieldName
	 * @return {boolean} True if the field name matches a registered taxonomy query parameter, otherwise false.
	 */
	isTaxonomyField( fieldName ) {
		return this.attr.taxParams !== undefined &&
			Object.values( this.attr.taxParams ).includes( fieldName )
			? true
			: false;
	}

	/**
	 * Adds a taxonomy filter to `queryParams` as a single-element integer array,
	 * which is the format expected by the WP REST API taxonomy query.
	 * A falsy or zero value is intentionally skipped (means "no filter").
	 *
	 * @param {HTMLElement} field - A select or input element whose name is a tax param.
	 */
	setTaxonomyQueryParameter( field ) {
		const fieldValue = parseInt( field.value );
		if ( fieldValue ) {
			this.queryParams[ field.name ] = [ fieldValue ];
		}
	}

	/**
	 * Determines the WP REST API endpoint based on the configured post type.
	 * Products use a custom theme endpoint; all other types use the standard
	 * WP REST API convention `/wp-json/wp/v2/{post_type}`.
	 */
	setRestPath() {
		if ( this.postType === 'post' ) {
			this.restPath = '/wp-json/wp/v2/posts';
		} else if ( this.postType === 'product' ) {
			// Products use a custom REST route that supports WooCommerce-specific filters
			this.restPath = '/wp-json/capitola/v1/product-search';
		} else {
			this.restPath = '/wp-json/wp/v2/' + this.postType;
		}
	}

	/**
	 * Empties the results list and smoothly scrolls the viewport back up to it.
	 * Called before every new fetch so stale results are never visible.
	 */
	clearResults() {
		this.elements.list.innerHTML = '';
		window.scrollTo( {
			top: this.elements.list.offsetTop - 120, // 120px offset accounts for sticky header
			behavior: 'smooth',
		} );
	}

	/**
	 * Handles clicks on the pagination nav bar (previous, next, and numbered
	 * page buttons). Updates `queryParams.page`, clears the list, and fetches
	 * the new page of results.
	 *
	 * @param {MouseEvent} event
	 */
	turnPage( event ) {
		const button = event.target;
		// Ignore clicks on non-interactive elements inside the nav bar
		if (
			! button.classList.contains( 'js-navPrev' ) &&
			! button.classList.contains( 'js-navNext' ) &&
			! button.classList.contains( 'js-navPageNum' )
		) {
			return;
		}
		if ( button.classList.contains( 'js-navPrev' ) ) {
			this.queryParams.page--;
			this.clearResults();
		} else if ( button.classList.contains( 'js-navNext' ) ) {
			this.queryParams.page++;
			this.clearResults();
		} else if ( button.classList.contains( 'js-navPageNum' ) ) {
			this.queryParams.page = parseInt( button.dataset.page );
			this.clearResults();
		} else {
			return false;
		}
		button.blur();
		this.urlParams.set( 'page_num', this.queryParams.page );
		this.getPosts();
	}

	/**
	 * Handles explicit form submission (search button click). Reads all search
	 * field values into `queryParams`, resets to page 1, and fetches results.
	 *
	 * @param {MouseEvent} event
	 */
	submitForm( event ) {
		event.preventDefault();
		this.elements.searchFields.forEach( ( field ) => {
			if ( field.value ) {
				this.queryParams[ field.name ] = field.value;
				this.urlParams.set( field.name, field.value );
			} else {
				delete this.queryParams[ field.name ];
				this.urlParams.delete( field.name );
			}
		} );
		this.clearResults();
		this.queryParams.page = 1;
		this.urlParams.set( 'page_num', 1 );
		this.getPosts();
	}

	/**
	 * Handles changes on auto-filter fields (those with the `.js-autoFilter`
	 * class). Immediately fetches new results without requiring form submission.
	 * Supports checkboxes (multi-value), taxonomy selects, and plain selects.
	 *
	 * @param {Event} event
	 */
	updateFilters( event ) {
		const values = new FormData( this.elements.filterForm );
		const field = event.target;
		this.clearResults();
		this.queryParams.page = 1; // Reset to page 1 whenever filters change
		this.urlParams.set( 'page_num', 1 );

		if ( field.type === 'checkbox' ) {
			const cbv = values.getAll( field.name );
			if ( cbv.length ) {
				this.queryParams[ field.name ] = cbv;
				this.urlParams.set( field.name, cbv );
			} else {
				delete this.queryParams[ field.name ];
				this.urlParams.delete( field.name );
			}
		} else if ( ! field.value || field.value === 0 || field.value === '0' ) {
			delete this.queryParams[ field.name ];
			this.urlParams.delete( field.name );
		} else {
			if ( this.isTaxonomyField( field.name ) ) {
				this.queryParams[ field.name ] = [ parseInt( field.value ) ];
			} else {
				this.queryParams[ field.name ] = field.value;
			}
			this.urlParams.set( field.name, field.value );
		}
		this.queryParams.order = this.attr.orderbyOptions[ this.queryParams.orderby ].order;
		this.getPosts();
	}

	/**
	 * Fetches posts from the REST API using the current `queryParams` and
	 * renders them into the DOM. Also updates the browser URL, manages the
	 * loading state, and triggers pagination and result-count updates.
	 */
	getPosts() {
		this.elements.navBar.classList.add( '--is-loading' );

		// Push current filter state to the browser history so the URL stays shareable
		const p = this.urlParams.toString();
		if ( p.length > 0 ) {
			window.history.pushState( null, null, '?' + p );
		}

		// Append a cache-busting timestamp to prevent stale browser/CDN caching
		const query = {
			data: { ...this.queryParams, cacheBuster: new Date().getTime() },
		};

		fetch( addQueryArgs( this.restPath, query.data ), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		} )
			.then( ( response ) => {
				this.numPages = response.headers.get( 'x-wp-totalpages' );
				this.totalResults = response.headers.get( 'x-wp-total' );
				return response.json();
			} )
			.then( ( data ) => {
				this.elements.navBar.classList.remove( '--is-loading' );
				this.numResults = data.length;
				data.forEach( ( post ) => {
					if ( this.postType === 'product' ) {
						this.elements.list.innerHTML += this.renderProduct( post );
					} else {
						this.elements.list.innerHTML += this.renderItem( post );
					}
				} );
				this.setPageLinks();
				if ( this.elements.resultsCount ) {
					this.setResultCount();
				}
			} )
			.catch( ( error ) => {
				console.error( error );
				this.elements.navBar.classList.remove( '--is-loading' );
				this.elements.list.innerHTML =
					'<p>An error occurred while fetching the data. Please try again later.</p>';
			} );
		return false;
	}

	/**
	 * Enables or disables the previous/next pagination buttons based on the
	 * current page and total page count.
	 */
	setPagingLinks() {
		this.queryParams.page = parseInt( this.queryParams.page );

		if (
			parseInt( this.numPages ) === 0 ||
			parseInt( this.queryParams.page ) === this.numPages
		) {
			this.elements.navNext.disabled = true;
		} else if ( this.elements.navNext.disabled ) {
			this.elements.navNext.disabled = false;
		}

		if ( parseInt( this.queryParams.page ) === 1 ) {
			this.elements.navPrevious.disabled = true;
		} else if ( this.elements.navPrevious.disabled ) {
			this.elements.navPrevious.disabled = false;
		}
	}

	/**
	 * Renders the complete pagination UI: hides the nav bar when there is only
	 * one page, otherwise builds the numbered page-button list and updates
	 * prev/next button states.
	 */
	setPageLinks() {
		this.setPagingLinks();
		if ( this.numPages < 2 ) {
			this.elements.navPageNumbers.innerHTML = '';
			this.elements.navBar.classList.add( '--hidden' );
		} else {
			const paginationIndexes = this.getPageIndexes();
			this.elements.navBar.classList.remove( '--hidden' );

			this.elements.navPageNumbers.innerHTML = '';
			paginationIndexes.forEach( ( index ) => {
				if ( index === '...' ) {
					this.elements.navPageNumbers.innerHTML +=
						'<li class="capitola-page-nav__button --number --dots" disabled>....</li>';
				} else if ( parseInt( index ) === parseInt( this.queryParams.page ) ) {
					this.elements.navPageNumbers.innerHTML +=
						'<li class="capitola-page-nav__button --number --current">' +
						index +
						'</li>';
				} else {
					this.elements.navPageNumbers.innerHTML += `
          <li>
            <button class="capitola-page-nav__button --number js-navPageNum" data-page="${ index }" type="button">
              ${ index }
            </button>
          </li>
        `;
				}
			} );
		}
	}

	/**
	 * Builds a human-readable result count string and writes it to the
	 * `.js-resultsCount` element (e.g. "Showing 11–20 of 47 results").
	 */
	setResultCount() {
		let count;
		const perpage = this.queryParams.per_page;

		if ( ! this.numResults ) {
			count = 'No results found';
		} else if ( 1 === this.numPages && 1 === this.numResults ) {
			count = '1 Result';
		} else if ( 1 === this.numPages ) {
			count = this.numResults + ' Results';
		} else {
			const first =
				this.queryParams.page > 1 ? perpage * this.queryParams.page - perpage + 1 : 1;
			const last = first + this.numResults - 1;

			count = 'Showing ' + first + '&ndash;' + last + ' of ' + this.totalResults + ' results';
		}
		this.elements.resultsCount.innerHTML = count;
	}

	/**
	 * Computes the array of page indexes (integers and '...' ellipsis strings)
	 * to display in the pagination bar.
	 *
	 * Strategy:
	 *  - 6 or fewer pages → show every page number.
	 *  - Current page is more than 5 away from the end → show current + 2
	 *    neighbours, ellipsis, then the last 3 pages.
	 *  - Otherwise → show the last 6 pages with a leading ellipsis.
	 *
	 * @return {Array<number|string>} An array of page numbers and ellipsis strings ("...") for pagination display.
	 */
	getPageIndexes() {
		const page = parseInt( this.queryParams.page );
		this.queryParams.page = parseInt( this.queryParams.page );
		this.numPages = parseInt( this.numPages );
		const paginationValues = [];

		// output all page numbers if 6 or fewer pages
		if ( this.numPages <= 6 ) {
			for ( let i = 1; i <= this.numPages; i++ ) {
				paginationValues.push( i );
			}
		} else if ( page + 5 < this.numPages ) {
			paginationValues.push( page );
			paginationValues.push( page + 1 );
			paginationValues.push( page + 2 );
			paginationValues.push( '...' );
			paginationValues.push( this.numPages - 2 );
			paginationValues.push( this.numPages - 1 );
			paginationValues.push( this.numPages );
		} else {
			for ( let i = this.numPages; i >= this.numPages - 5; i-- ) {
				paginationValues.unshift( i );
			}
			paginationValues.unshift( '...' );
		}
		return paginationValues;
	}

	/**
	 * Returns the HTML string for a standard post card (non-product).
	 * Layout variations (title position, CTA location, byline, etc.) are
	 * driven by the `layoutConditionals` helper.
	 *
	 * @param {Object} itemData - Post data object from the WP REST API response.
	 * @return {string} HTML markup for one result card.
	 */
	renderItem( itemData ) {
		const conditionals = layoutConditionals( this.attr );
		const card = `
    <article class="capitola-result swiper-slide">
      <a class="capitola-result__link" href="${ itemData.link }">
        <div class="capitola-result__image-col --theme-image-overlay">
          ${ itemData.image_html.large }
          ${ conditionals.titleLocation === 'image' ? `<div class="__opacity-layer"></div>` : '' }
          <div class="capitola-result__thumb-content">
            ${
				conditionals.titleLocation === 'image'
					? `
              <${ this.attr.titleTag } class="capitola-result__thumb-title --hl-s">
                ${ itemData.title.rendered }
              </${ this.attr.titleTag }>
              ${
					itemData.event_dates
						? `
                <div class="capitola-result__thumb-subtitle">
                  ${ itemData.event_dates }
                </div>`
						: ''
				}
            `
					: ''
			}
            ${
				this.attr.ctaText && conditionals.ctaLocation === 'image'
					? `<span class="capitola-result__thumb-cta --cta --tertiary">${ this.attr.ctaText }</span>`
					: ''
			}
          </div>
          ${
				itemData.category_name && conditionals.titleLocation === 'image'
					? `
            <div class="capitola-result__thumb-cat">
              ${ itemData.category_name }
            </div>`
					: ''
			}
        </div>
        ${
			conditionals.hasBottom
				? `
          <div class="capitola-result__content">
            ${
				conditionals.titleLocation === 'body'
					? `

                <div>
                ${
					itemData.category_name
						? `<div class="capitola-result__body-cat --eyebrow">${ itemData.category_name }</div>`
						: ''
				}
              <${ this.attr.titleTag } class="capitola-result__title --hl-s">
                ${ itemData.title.rendered }
              </${ this.attr.titleTag }>
              </div>
              ${
					itemData.event_dates
						? `
                <div class="capitola-result__subtitle">
                  ${ itemData.event_dates }
                </div>`
						: ''
				}`
					: ''
			}
            ${
				itemData.excerpt.rendered && this.attr.showExcerpt
					? `<p class="capitola-result__excerpt">
                ${ itemData.excerpt.rendered }
              </p>`
					: ''
			}
            ${
				conditionals.showByline
					? `<div class="capitola-result__byline">
                ${
					itemData.byline.author_image
						? `<div class="capitola-result__byline-img-wrap">
                    <img src="${ itemData.byline.author_image }" alt="${ itemData.byline.name }"/>
                  </div>`
						: ``
				}
                <div class="capitola-result__byline-date">${ itemData.byline.name }<br>${
					itemData.byline.date
				}</div>
              </div>`
					: ''
			}
            ${
				this.attr.ctaText && conditionals.ctaLocation === 'body'
					? `<div class="capitola-result__cta --cta --tertiary">
                ${ this.attr.ctaText }
              </div>`
					: ''
			}
          </div>`
				: ''
		}
      </a>
    </article>`;
		return card;
	}

	/**
	 * Returns the HTML string for a WooCommerce product card. Supports optional
	 * display of brand, part number, MSRP, price, star rating, and excerpt based
	 * on block attributes.
	 *
	 * @param {Object} itemData - Product data object from the custom REST endpoint.
	 * @return {string} HTML markup for one product card.
	 */
	renderProduct( itemData ) {
		const card = `
      <article class="capitola-result">
        <a class="capitola-result__link --contain" href="${ itemData.link }" aria-label="${
			itemData.post_title
		}">
          <div class="capitola-result__image-col --contain">
            ${ itemData.image_html }
            ${ itemData.on_sale ? `<span class="capitola-result__badge">Sale!</span>` : '' }
          </div>
          <div class="capitola-result__content --product-grid">
            <${ this.attr.titleTag } class="capitola-result__title --hl-s">
              ${ itemData.post_title }
            </${ this.attr.titleTag }>
            <div class="capitola-result__product-meta">
              ${
					this.attr.showBrand && itemData.capitola_brand
						? `<div class="capitola-result__product-meta-detail">
                  <span>
                    ${ itemData.capitola_brand }
                  </span>
                </div>`
						: ''
				}
              ${
					this.attr.showPartNumber && itemData.part_number
						? `<div class="capitola-result__product-meta-detail">
                  ${
						this.attr.partNumberPrefix
							? '<span>' + this.attr.partNumberPrefix + '</span>'
							: ''
					}
                  <span>${ itemData.part_number }</span>
                </div>`
						: ''
				}
              ${
					this.attr.showMSRP && itemData.capitola_msrp_range
						? `<div class="capitola-result__product-meta-detail">
                  ${
						this.attr.msrpPrefix
							? `<span>
                      ${ this.attr.msrpPrefix }
                    </span>`
							: ''
					}
                  <span>${ itemData.capitola_msrp_range }</span>
                </div>`
						: ''
				}
              <div class="capitola-result__product-meta-detail">
                ${
					this.attr.ourPricePrefix && this.attr.showMSRP && itemData.capitola_msrp_range
						? `<span>${ this.attr.ourPricePrefix }
                  </span>`
						: ''
				}
                <span>${ itemData.price_html }</span>
              </div>
              ${
					this.attr.showRating && itemData.rating
						? `<div class="capitola-result__product-meta-detail star-rating" role="img" aria-label="Rated ${ itemData.rating } out of 5" data-rating="${ itemData.rating }"></div>`
						: ''
				}
            </div>
            ${
				this.attr.showExcerpt && itemData.short_description
					? `<p class="capitola-result__excerpt">
                ${ itemData.short_description }
              </p>`
					: ''
			}
            ${
				this.attr.ctaText
					? `<div class="capitola-result__cta --cta --tertiary">${ this.attr.ctaText }</div>`
					: ''
			}
          </div>
        </a>
      </article>
    `;
		return card;
	}
}
