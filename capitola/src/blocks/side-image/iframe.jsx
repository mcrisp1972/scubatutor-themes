/* eslint-disable jsx-a11y/iframe-has-title */
import { PlaceholderIframe } from '@capitola/editor-controls';

function isValidIframeHtml( html ) {
	const pattern = /<iframe[^>]*>([\s\S]*?)<\/iframe>/gm;
	return pattern.test( html );
}

function parseIframeAttributes( iframeString ) {
	const parser = new DOMParser();
	const doc = parser.parseFromString( iframeString, 'text/html' );
	const iframe = doc.querySelector( 'iframe' );

	if ( ! iframe ) {
		return {};
	}

	const attributes = {};
	for ( let i = 0; i < iframe.attributes.length; i++ ) {
		const attr = iframe.attributes[ i ];
		let propName = attr.name;

		// Convert HTML attributes to React prop names
		if ( propName === 'frameborder' ) {
			propName = 'frameBorder';
		}
		if ( propName === 'allowfullscreen' ) {
			propName = 'allowFullScreen';
		}
		if ( propName === 'class' ) {
			propName = 'className';
		}

		attributes[ propName ] = attr.value;
	}

	if ( ! attributes.title ) {
		attributes.title = 'Embedded content';
	}

	return attributes;
}

function iFrameAspect( iframe ) {
	// Extract width and height to calculate aspect ratio
	const widthMatch = iframe.match( /width=["']?(\d+)["']?/i );
	const heightMatch = iframe.match( /height=["']?(\d+)["']?/i );

	if ( widthMatch && widthMatch[ 1 ] && heightMatch && heightMatch[ 1 ] ) {
		const iframeWidth = parseInt( widthMatch[ 1 ], 10 );
		const iframeHeight = parseInt( heightMatch[ 1 ], 10 );
		const iframeAspectRatio = iframeWidth + '/' + iframeHeight;
		return iframeAspectRatio;
	}
	return '16/9'; // Default to 16:9
}

export function Iframe( { iframeCode, radiusClass } ) {
	if ( ! isValidIframeHtml( iframeCode ) ) {
		return <PlaceholderIframe className={ `${ radiusClass } --16-9` } />;
	}

	return (
		<div
			className={ `wp-block-capitola-side-image__iframe-wrap ${ radiusClass }` }
			style={ { aspectRatio: iFrameAspect( iframeCode ) } }
		>
			<iframe { ...parseIframeAttributes( iframeCode ) } />
		</div>
	);
}
