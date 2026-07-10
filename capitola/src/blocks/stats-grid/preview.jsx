import { Button } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { gsap } from 'gsap';

export const findEditorDocument = () => {
	const editorCanvasIframe = document.querySelector( 'iframe[name="editor-canvas"]' );
	if ( editorCanvasIframe ) {
		try {
			const canvasDocument = editorCanvasIframe.contentDocument;
			if ( canvasDocument ) {
				return canvasDocument;
			}
		} catch {
			// Ignore inaccessible iframe documents.
		}
	}

	return document;
};

export const previewStatValue = ( statElement, statValue, duration ) => {
	const match = statValue.match( /^(.*?)([\d,]*\.?\d+)(.*)$/s );

	if ( ! match ) {
		return;
	}

	const prefix = match[ 1 ];
	const rawNumber = match[ 2 ];
	const suffix = match[ 3 ];
	const targetValue = Number.parseFloat( rawNumber.replace( /,/g, '' ) );

	if ( Number.isNaN( targetValue ) ) {
		return;
	}

	const decimalPlaces = rawNumber.includes( '.' ) ? rawNumber.split( '.' )[ 1 ].length : 0;
	const snapValue = decimalPlaces > 0 ? 10 ** -decimalPlaces : 1;
	const useGrouping = rawNumber.includes( ',' );
	const formatter = new Intl.NumberFormat( undefined, {
		useGrouping,
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	} );
	const countObject = { val: 0 };

	statElement.innerText = `${ prefix }${ formatter.format( 0 ) }${ suffix }`;

	gsap.to( countObject, {
		val: targetValue,
		duration,
		ease: 'power1.out',
		snap: { val: snapValue },
		onUpdate: () => {
			statElement.innerText = `${ prefix }${ formatter.format(
				countObject.val
			) }${ suffix }`;
		},
	} );
};

export function StatsAnimationPreviewButton( {
	previewBlocks = [],
	duration = 2,
	disabled = false,
	label = 'Preview Stats Animation',
} ) {
	const [ isPreviewing, setIsPreviewing ] = useState( false );
	const previewTimeoutRef = useRef();

	useEffect( () => {
		return () => {
			if ( previewTimeoutRef.current ) {
				window.clearTimeout( previewTimeoutRef.current );
			}
			setIsPreviewing( false );
		};
	}, [] );

	const startPreview = () => {
		if ( previewTimeoutRef.current ) {
			window.clearTimeout( previewTimeoutRef.current );
		}

		const editorDocument = findEditorDocument();
		const previewTargets = previewBlocks
			.map( ( block ) => {
				const selector = `[data-block="${ block.clientId }"] .wp-block-capitola-stats-item__stat`;
				return {
					block,
					statElement: editorDocument.querySelector( selector ),
				};
			} )
			.filter( ( item ) => {
				return Boolean( item.statElement );
			} );

		if ( previewTargets.length === 0 ) {
			return;
		}

		setIsPreviewing( true );
		previewTargets.forEach( ( { block, statElement } ) => {
			const statValue = block?.attributes?.stat || '';
			previewStatValue( statElement, statValue, duration );
		} );

		previewTimeoutRef.current = window.setTimeout(
			() => {
				setIsPreviewing( false );
			},
			duration * 1000 + 150
		);
	};

	return (
		<Button
			variant="secondary"
			isBusy={ isPreviewing }
			disabled={ disabled || isPreviewing || previewBlocks.length === 0 }
			style={ { width: '100%', justifyContent: 'center' } }
			icon="controls-play"
			onClick={ startPreview }
		>
			{ label }
		</Button>
	);
}
