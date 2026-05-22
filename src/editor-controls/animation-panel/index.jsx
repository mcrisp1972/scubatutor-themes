/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	RadioControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';

const animationSets = {
	fadeIn: {
		label: 'Fade In',
		defaults: {
			duration: 1,
			origin: 0,
			direction: '',
			startPosition: 0,
			easing: 'ease-in',
		},
		options: [ 'duration', 'easing' ],
	},
	fadeUp: {
		label: 'Fade Up',
		defaults: {
			duration: 1,
			origin: 'bottom',
			direction: 'vertical',
			startPosition: '40px',
			easing: 'ease',
		},
		options: [ 'startPosition', 'duration', 'easing' ],
	},
	sideReveal: {
		label: 'Side Reveal',
		defaults: {
			duration: 1,
			origin: 'right',
			direction: 'horizontal',
			startPosition: '100%',
			easing: 'ease',
		},
		options: [ 'duration', 'easing', 'origin' ],
	},
	sideShift: {
		label: 'Side Shift',
		defaults: {
			duration: 1,
			origin: 'right',
			direction: 'horizontal',
			startPosition: '200px',
			easing: 'ease',
		},
		options: [ 'duration', 'easing', 'startPosition', 'origin' ],
	},
};

export function animationPreviewClass( animationAttribute, animatedSection ) {
	if ( ! animationAttribute || ! animationAttribute.animation ) {
		return '';
	}
	const { section } = animationAttribute;
	if ( section === animatedSection ) {
		return ' js-animation-preview';
	}
	return '';
}

function AnimationPanel( { props, sections = [ 'block', 'body' ] } ) {
	const { attributes, setAttributes } = props;
	const { revealAnimation, introAlign } = attributes;
	const [ isPreviewing, setIsPreviewing ] = useState( false );
	const defaultAttribute = getBlockType( props.name )?.attributes?.revealAnimation?.default || {};
	const allowSectionSelect = sections && sections.length > 0 && revealAnimation.animation !== '';

	const findPreviewTarget = () => {
		const selector = `[data-block="${ props.clientId }"] .js-animation-preview`;

		// Prefer the block editor canvas iframe when present (WP iframe editor mode).
		const editorCanvasIframe = document.querySelector( 'iframe[name="editor-canvas"]' );
		if ( editorCanvasIframe ) {
			try {
				const canvasDocument = editorCanvasIframe.contentDocument;
				const iframeMatch = canvasDocument?.querySelector( selector );
				if ( iframeMatch ) {
					return iframeMatch;
				}
			} catch {
				// Ignore inaccessible iframe documents.
			}
		}

		// Fallback for non-iframed editor mode.
		const hostMatch = document.querySelector( selector );
		if ( hostMatch ) {
			return hostMatch;
		}

		return null;
	};

	const previewAnimation = ( attribute ) => {
		const target = findPreviewTarget();
		if ( ! target ) {
			return;
		}
		const { direction, section, duration, startPosition, origin, easing } = attribute;

		setIsPreviewing( true );
		target.style.transition = 'none';
		target.style.opacity = 0;

		if ( direction === 'vertical' ) {
			target.style.transform = `translate(0, ${ startPosition })`;
		}

		if ( direction === 'horizontal' ) {
			let translateValue = `translate(${ startPosition }, 0)`;
			if ( section === 'block' && origin === 'left' ) {
				translateValue = `translate(-${ startPosition }, 0)`;
			} else if ( section === 'body' && introAlign === 'left' ) {
				translateValue = `translate(-${ startPosition }, 0)`;
			} else if ( section === 'figure' && introAlign === 'right' ) {
				translateValue = `translate(-${ startPosition }, 0)`;
			}
			target.style.transform = translateValue;
		}

		const timeoutDuration = 500;
		setTimeout( () => {
			target.style.transition = `opacity ${ duration }s ${ easing }, transform ${ duration }s ${ easing }`;
			target.style.transform = 'translate(0)';
			target.style.opacity = 1;
			setIsPreviewing( false );
		}, timeoutDuration );
	};

	const currentAnimationSet = animationSets[ revealAnimation.animation ];

	return (
		<ToolsPanel
			label="Animation"
			resetAll={ () => {
				const blockMetadata = getBlockType( props.name );
				return setAttributes( {
					revealAnimation: blockMetadata.attributes.revealAnimation.default,
				} );
			} }
		>
			<ToolsPanelItem
				label="Amination Style"
				hasValue={ () => {
					return revealAnimation.animation !== '';
				} }
				onDeselect={ () => {
					setAttributes( {
						revealAnimation: {
							...revealAnimation,
							animation: defaultAttribute.animation,
							section: defaultAttribute.section,
							origin: defaultAttribute.origin,
						},
					} );
				} }
				isShownByDefault={ true }
			>
				<SelectControl
					label="Amination Style"
					value={ revealAnimation.animation }
					options={ [
						{ label: 'None', value: '' },
						...Object.entries( animationSets ).map( ( [ key, object ] ) => {
							return { label: object.label, value: key };
						} ),
					] }
					onChange={ ( value ) => {
						const newAttribute = value
							? {
									...revealAnimation,
									...animationSets[ value ]?.defaults,
									animation: value,
							  }
							: {
									...defaultAttribute,
									section: revealAnimation.section,
									allowSectionSelect: revealAnimation.allowSectionSelect,
									animation: '',
							  };

						if ( value ) {
							previewAnimation( newAttribute );
						}
						setAttributes( {
							revealAnimation: newAttribute,
						} );
					} }
				/>
			</ToolsPanelItem>
			{ allowSectionSelect && (
				<div style={ { gridColumn: '1 / 3' } }>
					<RadioControl
						label="Aminated Section"
						selected={ revealAnimation.section }
						options={ [
							...( sections.includes( 'block' )
								? [
										{
											label: 'Whole Block',
											value: 'block',
										},
								  ]
								: [] ),
							...( sections.includes( 'body' )
								? [
										{
											label: 'Intro Section Only',
											value: 'body',
										},
								  ]
								: [] ),
							...( sections.includes( 'figure' )
								? [
										{
											label: 'Figure Section Only',
											value: 'figure',
										},
								  ]
								: [] ),
						] }
						onChange={ ( value ) => {
							setAttributes( {
								revealAnimation: { ...revealAnimation, section: value },
							} );
						} }
						style={ { marginBottom: '0' } }
					/>
				</div>
			) }
			{ ( revealAnimation.section === 'block' || revealAnimation.section === null ) &&
				currentAnimationSet?.options?.includes( 'origin' ) && (
					<div style={ { gridColumn: '1 / 3' } }>
						<RadioControl
							label="Reveal From"
							selected={ revealAnimation.origin }
							options={ [
								{ label: 'Right', value: 'right' },
								{ label: 'Left', value: 'left' },
							] }
							onChange={ ( value ) => {
								const newAttribute = { ...revealAnimation, origin: value };
								previewAnimation( newAttribute );
								setAttributes( {
									revealAnimation: newAttribute,
								} );
							} }
						/>
					</div>
				) }
			{ revealAnimation.animation && currentAnimationSet?.options?.includes( 'duration' ) && (
				<ToolsPanelItem
					label="Duration"
					hasValue={ () => {
						return revealAnimation.duration !== currentAnimationSet.defaults.duration;
					} }
					onDeselect={ () => {
						setAttributes( {
							revealAnimation: {
								...revealAnimation,
								duration: currentAnimationSet.defaults.duration,
							},
						} );
					} }
				>
					<SelectControl
						label="Duration"
						value={ revealAnimation.duration }
						options={ [
							{ label: '1.5s', value: 1.5 },
							{ label: '1s', value: 1 },
							{ label: '0.9s', value: 0.9 },
							{ label: '0.8s', value: 0.8 },
							{ label: '0.7s', value: 0.7 },
							{ label: '0.6s', value: 0.6 },
							{ label: '0.5s', value: 0.5 },
							{ label: '0.4s', value: 0.4 },
							{ label: '0.3s', value: 0.3 },
							{ label: '0.2s', value: 0.2 },
							{ label: '0.1s', value: 0.1 },
						] }
						onChange={ ( value ) => {
							const newAttribute = { ...revealAnimation, duration: value };
							setAttributes( {
								revealAnimation: newAttribute,
							} );
							previewAnimation( newAttribute );
						} }
						__next40pxDefaultSize
					/>
				</ToolsPanelItem>
			) }
			{ revealAnimation.animation &&
				currentAnimationSet?.options?.includes( 'startPosition' ) && (
					<ToolsPanelItem
						label="Starting Position"
						hasValue={ () => {
							return (
								revealAnimation.startPosition !==
								currentAnimationSet.defaults.startPosition
							);
						} }
						onDeselect={ () => {
							setAttributes( {
								revealAnimation: {
									...revealAnimation,
									startPosition: currentAnimationSet.defaults.startPosition,
								},
							} );
						} }
					>
						<UnitControl
							label="Start Position"
							value={ revealAnimation.startPosition }
							max={ 200 }
							min={ 0 }
							step={ 10 }
							units={ [
								{
									value: 'px',
									label: 'px',
									default: 0,
								},
							] }
							onChange={ ( value ) => {
								const newAttribute = {
									...revealAnimation,
									startPosition: value,
								};
								setAttributes( {
									revealAnimation: newAttribute,
								} );
								previewAnimation( newAttribute );
							} }
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
				) }
			{ revealAnimation.animation && (
				<ToolsPanelItem
					label="Easing"
					hasValue={ () => {
						return revealAnimation.easing !== currentAnimationSet?.defaults.easing;
					} }
					onDeselect={ () => {
						setAttributes( {
							revealAnimation: {
								...revealAnimation,
								easing: currentAnimationSet.defaults.easing,
							},
						} );
					} }
				>
					<RadioControl
						label="Easing"
						selected={ revealAnimation.easing }
						options={ [
							{ label: 'linear', value: 'linear' },
							{ label: 'ease', value: 'ease' },
							{ label: 'ease-in', value: 'ease-in' },
							{ label: 'ease-out', value: 'ease-out' },
							{ label: 'ease-in-out', value: 'ease-in-out' },
						] }
						onChange={ ( value ) => {
							const newAttribute = { ...revealAnimation, easing: value };
							setAttributes( {
								revealAnimation: newAttribute,
							} );
							previewAnimation( newAttribute );
						} }
					/>
				</ToolsPanelItem>
			) }
			{ revealAnimation.animation && (
				<Button
					variant="primary"
					isBusy={ isPreviewing }
					disabled={ isPreviewing }
					isPressed={ isPreviewing }
					style={ { gridColumn: 'span 2' } }
					icon="controls-play"
					onClick={ () => {
						previewAnimation( revealAnimation );
					} }
				>
					Preview Animation
				</Button>
			) }
		</ToolsPanel>
	);
}

export default AnimationPanel;
