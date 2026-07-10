import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin( ScrollTrigger );

const counterElements = document.querySelectorAll( '.stat-counter' );
const triggerElements = new Set();

counterElements.forEach( ( counterElement ) => {
	const triggerElement = counterElement.closest( '.js-animated-stats-grid' ) || counterElement;
	triggerElements.add( triggerElement );
} );

const animateCounter = ( counterElement ) => {
	const targetText = counterElement.getAttribute( 'data-target' ) || '';
	const targetValue = Number.parseFloat( targetText );

	if ( Number.isNaN( targetValue ) ) {
		return;
	}
	const speed =
		counterElement
			.closest( '.js-animated-stats-grid' )
			?.getAttribute( 'data-animated-stats-speed' ) || 2;
	const originalText = counterElement.getAttribute( 'data-original' );
	const countObject = { val: 0 };
	const decimalPlaces = targetText.includes( '.' ) ? targetText.split( '.' )[ 1 ].length : 0;
	const snapValue = decimalPlaces > 0 ? 10 ** -decimalPlaces : 1;
	const useGrouping = originalText.includes( ',' );
	const formatter = new Intl.NumberFormat( undefined, {
		useGrouping,
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	} );

	gsap.to( countObject, {
		val: targetValue,
		duration: speed,
		ease: 'power1.out',
		snap: { val: snapValue },
		onUpdate: () => {
			counterElement.innerText = formatter.format( countObject.val );
		},
	} );
};

triggerElements.forEach( ( triggerElement ) => {
	const counterTargets = triggerElement.matches( '.stat-counter' )
		? [ triggerElement ]
		: triggerElement.querySelectorAll( '.stat-counter' );

	ScrollTrigger.create( {
		trigger: triggerElement,
		start: 'top 80%', // Triggers when top of the element hits 80% of the viewport
		onEnter: ( self ) => {
			if ( self.direction !== 1 ) {
				return;
			}
			counterTargets.forEach( animateCounter );
			self.kill();
		},
	} );
} );
