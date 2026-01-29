/* eslint-disable no-console */
import { addQueryArgs } from '@wordpress/url';
import { layoutConditionals } from '../../blocks/post-feed/layoutConditionals';

export default class filteredListings {
	constructor( listings ) {
		// eslint-disable-next-line no-undef
		this.attr = listingAttributes;
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
		this.numPages = 0;
		this.numResults = 0;
		this.totalResults = 0;
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

		if ( parseInt( this.attr.baseTerm ) ) {
			this.queryParams[ this.attr.taxParams[ this.attr.baseTaxonomy ] ] = [ parseInt( this.attr.baseTerm ) ];
		}

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

	isTaxonomyField( fieldName ) {
		return this.attr.taxParams !== undefined && Object.values( this.attr.taxParams ).includes( fieldName )
			? true
			: false;
	}

	setTaxonomyQueryParameter( field ) {
		const fieldValue = parseInt( field.value );
		if ( fieldValue ) {
			this.queryParams[ field.name ] = [ fieldValue ];
		}
	}

	setRestPath() {
		if ( this.postType === 'post' ) {
			this.restPath = '/wp-json/wp/v2/posts';
		} else if ( this.postType === 'product' ) {
			this.restPath = '/wp-json/cwps/v1/product-search';
		} else {
			this.restPath = '/wp-json/wp/v2/' + this.postType;
		}
	}

	clearResults() {
		this.elements.list.innerHTML = '';
		window.scrollTo( {
			top: this.elements.list.offsetTop - 120,
			behavior: 'smooth',
		} );
	}

	turnPage( event ) {
		const button = event.target;
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

	updateFilters( event ) {
		const values = new FormData( this.elements.filterForm );
		const field = event.target;
		this.clearResults();
		this.queryParams.page = 1;
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

	getPosts() {
		this.elements.navBar.classList.add( '--is-loading' );

		const p = this.urlParams.toString();
		if ( p.length > 0 ) {
			window.history.pushState( null, null, '?' + p );
		}

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
				// eslint-disable-next-line no-console
				console.error( error );
				this.elements.navBar.classList.remove( '--is-loading' );
				this.elements.list.innerHTML =
					'<p>An error occurred while fetching the data. Please try again later.</p>';
			} );
		return false;
	}

	setPagingLinks() {
		this.queryParams.page = parseInt( this.queryParams.page );

		if ( this.numPages == 0 || this.queryParams.page == this.numPages ) {
			this.elements.navNext.disabled = true;
		} else if ( this.elements.navNext.disabled ) {
			this.elements.navNext.disabled = false;
		}

		if ( this.queryParams.page == 1 ) {
			this.elements.navPrevious.disabled = true;
		} else if ( this.elements.navPrevious.disabled ) {
			this.elements.navPrevious.disabled = false;
		}
	}

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
						'<li class="cwps-page-nav__button --number --dots" disabled>....</li>';
				} else if ( index == this.queryParams.page ) {
					this.elements.navPageNumbers.innerHTML +=
						'<li class="cwps-page-nav__button --number --current">' + index + '</li>';
				} else {
					this.elements.navPageNumbers.innerHTML += `
          <li>
            <button class="cwps-page-nav__button --number js-navPageNum" data-page="${ index }" type="button">
              ${ index }
            </button>
          </li>
        `;
				}
			} );
		}
	}

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
			const first = this.queryParams.page > 1 ? perpage * this.queryParams.page - perpage + 1 : 1;
			const last = first + this.numResults - 1;

			count = 'Showing ' + first + '&ndash;' + last + ' of ' + this.totalResults + ' results';
		}
		this.elements.resultsCount.innerHTML = count;
	}

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

	renderItem( itemData ) {
		const conditionals = layoutConditionals( this.attr );
		const card = `
    <article class="cwps-result swiper-slide">
      <a class="cwps-result__link" href="${ itemData.link }">
        <div class="cwps-result__image-col --theme-image-overlay">
          ${ itemData.image_html.large }
          ${ conditionals.titleLocation === 'image' ? `<div class="__opacity-layer"></div>` : '' }
          <div class="cwps-result__thumb-content">
            ${
				conditionals.titleLocation === 'image'
					? `
              <${ this.attr.titleTag } class="cwps-result__thumb-title --hl-s">
                ${ itemData.title.rendered }
              </${ this.attr.titleTag }>
              ${
					itemData.event_dates
						? `
                <div class="cwps-result__thumb-subtitle">
                  ${ itemData.event_dates }
                </div>`
						: ''
				}
            `
					: ''
			}
            ${
				this.attr.ctaText && conditionals.ctaLocation === 'image'
					? `<span class="cwps-result__thumb-cta --cta --tertiary">${ this.attr.ctaText }</span>`
					: ''
			}
          </div>
          ${
				itemData.category_name && conditionals.titleLocation === 'image'
					? `
            <div class="cwps-result__thumb-cat">
              ${ itemData.category_name }
            </div>`
					: ''
			}
        </div>
        ${
			conditionals.hasBottom
				? `
          <div class="cwps-result__content">
            ${
				conditionals.titleLocation === 'body'
					? `

                <div>
                ${
					itemData.category_name
						? `<div class="cwps-result__body-cat --eyebrow">${ itemData.category_name }</div>`
						: ''
				}
              <${ this.attr.titleTag } class="cwps-result__title --hl-s">
                ${ itemData.title.rendered }
              </${ this.attr.titleTag }>
              </div>
              ${
					itemData.event_dates
						? `
                <div class="cwps-result__subtitle">
                  ${ itemData.event_dates }
                </div>`
						: ''
				}`
					: ''
			}
            ${
				itemData.excerpt.rendered && this.attr.showExcerpt
					? `<p class="cwps-result__excerpt">
                ${ itemData.excerpt.rendered }
              </p>`
					: ''
			}
            ${
				conditionals.showByline
					? `<div class="cwps-result__byline">
                ${
					itemData.byline.author_image
						? `<div class="cwps-result__byline-img-wrap">
                    <img src="${ itemData.byline.author_image }" alt="${ itemData.byline.name }"/>
                  </div>`
						: ``
				}
                <div class="cwps-result__byline-date">${ itemData.byline.name }<br>${ itemData.byline.date }</div>
              </div>`
					: ''
			}
            ${
				this.attr.ctaText && conditionals.ctaLocation === 'body'
					? `<div class="cwps-result__cta --cta --tertiary">
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

	renderProduct( itemData ) {
		const card = `
      <article class="cwps-result">
        <a class="cwps-result__link --contain" href="${ itemData.link }" aria-label="${ itemData.post_title }">
          <div class="cwps-result__image-col --contain">
            ${ itemData.image_html }
            ${ itemData.on_sale ? `<span class="cwps-result__badge">Sale!</span>` : '' }
          </div>
          <div class="cwps-result__content --product-grid">
            <${ this.attr.titleTag } class="cwps-result__title --hl-s">
              ${ itemData.post_title }
            </${ this.attr.titleTag }>
            <div class="cwps-result__product-meta">
              ${
					this.attr.showBrand && itemData.cwps_brand
						? `<div class="cwps-result__product-meta-detail">
                  <span>
                    ${ itemData.cwps_brand }
                  </span>
                </div>`
						: ''
				}
              ${
					this.attr.showPartNumber && itemData.part_number
						? `<div class="cwps-result__product-meta-detail">
                  ${ this.attr.partNumberPrefix ? '<span>' + this.attr.partNumberPrefix + '</span>' : '' }
                  <span>${ itemData.part_number }</span>
                </div>`
						: ''
				}
              ${
					this.attr.showMSRP && itemData.cwps_msrp_range
						? `<div class="cwps-result__product-meta-detail">
                  ${
						this.attr.msrpPrefix
							? `<span>
                      ${ this.attr.msrpPrefix }
                    </span>`
							: ''
					}
                  <span>${ itemData.cwps_msrp_range }</span>
                </div>`
						: ''
				}
              <div class="cwps-result__product-meta-detail">
                ${
					this.attr.ourPricePrefix && this.attr.showMSRP && itemData.cwps_msrp_range
						? `<span>${ this.attr.ourPricePrefix }
                  </span>`
						: ''
				}
                <span>${ itemData.price_html }</span>
              </div>
              ${
					this.attr.showRating && itemData.rating
						? `<div class="cwps-result__product-meta-detail star-rating" role="img" aria-label="Rated ${ itemData.rating } out of 5" data-rating="${ itemData.rating }"></div>`
						: ''
				}
            </div>
            ${
				this.attr.showExcerpt && itemData.short_description
					? `<p class="cwps-result__excerpt">
                ${ itemData.short_description }
              </p>`
					: ''
			}
            ${ this.attr.ctaText ? `<div class="cwps-result__cta --cta --tertiary">${ this.attr.ctaText }</div>` : '' }
          </div>
        </a>
      </article>
    `;
		return card;
	}
}
