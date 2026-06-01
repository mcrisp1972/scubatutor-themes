// eslint-disable-next-line no-unused-expressions
( 'use strict' );

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
