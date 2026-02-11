class backgroundImages {
	constructor() {
		const backgroundImageElements = document.querySelectorAll( '.js-background-image' );
		if ( backgroundImageElements ) {
			backgroundImageElements.forEach( function ( element ) {
				const imageElement = element.querySelector( 'img' );
				let backgroundImageSrc = '';
				if ( imageElement ) {
					backgroundImageSrc = imageElement.currentSrc || imageElement.src;
					element.style.backgroundImage = 'url(' + backgroundImageSrc + ')';
					imageElement.addEventListener( 'load', () => {
						backgroundImageSrc = imageElement.currentSrc || imageElement.src;
						element.style.backgroundImage = 'url(' + backgroundImageSrc + ')';
					} );
				}
			} );
		}
	}
}

new backgroundImages();
