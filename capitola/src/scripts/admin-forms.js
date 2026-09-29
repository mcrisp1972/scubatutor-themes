// eslint-disable-next-line no-unused-expressions
( 'use strict' );
require( 'select2' );

import imageSelector from './modules/media-field';

// eslint-disable-next-line no-undef
jQuery( document ).ready( function ( $ ) {
	// clear new term form fields when saved
	let numberOfTags = 0;
	let newNumberOfTags = 0;

	if ( ! $( '#the-list' ).children( 'tr' ).first().hasClass( 'no-items' ) ) {
		numberOfTags = $( '#the-list' ).children( 'tr' ).length;
	}

	$( document ).ajaxComplete( function () {
		newNumberOfTags = $( '#the-list' ).children( 'tr' ).length;
		if ( parseInt( newNumberOfTags ) > parseInt( numberOfTags ) ) {
			numberOfTags = newNumberOfTags;

			$( '#addtag .js-imageSelect.capitola-add-clear' ).each( function () {
				$( this ).removeClass( '--has-value' );
				$( this ).find( '.js-value' ).val( '0' );
				$( this ).find( '.js-imageSelectLinkValue' ).text( '' );
				$( this ).find( '.js-imageSelectSizeValue' ).text( '' );
				$( this ).find( '.js-imageSelectTitleRow' ).text( '' );
			} );

			$( '#addtag select.capitola-add-clear' ).each( function () {
				$( this ).val( $( this ).find( 'option:first' ).val() );
			} );
		}
	} );
} );

const mediaFields = document.querySelectorAll( '.js-imageSelect' );

if ( mediaFields ) {
	mediaFields.forEach( ( block ) => {
		new imageSelector( block );
	} );
}

// eslint-disable-next-line no-undef
jQuery( document ).ready( function ( $ ) {
	const $iconFields = $( '.js-capitola-admin-icons-field' );
	if ( $iconFields ) {
		$iconFields.each( function () {
			const $catField = $( this ).find( '.js-icon-cat-select' );
			const $iconField = $( this ).find( '.js-icon-select' );
			const $options = $iconField.find( 'option' );
			const iconPath = $( this ).data( 'icon-path' );
			$iconField.select2( {
				selectionCssClass: 'capitola-select2-icon',
				dropdownCssClass: 'capitola-select2-icon',
				templateResult( option ) {
					if ( ! option.id ) {
						return option.text;
					}
					const $option = $(
						`<div class="capitola-select2-icon" style="--icon-path: url(${ iconPath }${ option.element.dataset.svg }.svg);">${ option.text }</div>`
					);
					return $option;
				},
				templateSelection( selection ) {
					if ( ! selection.id ) {
						return selection.text;
					}
					const $state = $(
						`<div class="capitola-select2-icon" style="--icon-path: url(${ iconPath }${ selection.id }.svg);">${ selection.text }</div>`
					);
					return $state;
				},
			} );

			$catField.on( 'change', function () {
				const selectedCategory = $( this ).val();
				const $filteredOptions = $options.filter( function () {
					return (
						$( this ).data( 'category' ) === selectedCategory || $( this ).val() === ''
					);
				} );
				$iconField.empty().append( $filteredOptions );
			} );
		} );
	}
} );
