import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl, ToggleControl } from '@wordpress/components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef } from '@wordpress/element';
import {
	ColorThemePanel,
	AnimationPanel,
	RepeaterBlockControls,
	ImageSelectButton,
	PlaceholderImage,
	animationPreviewClass,
} from '@capitola/editor-controls';

function SlideBody( { slide, index, slides, setAttributes, isSelected, swiperIndex } ) {
	return (
		<>
			{ !! slide.image.source_url && <img src={ slide.image.source_url } alt="" /> }
			{ ! slide.image.source_url && <PlaceholderImage /> }
			{ isSelected && swiperIndex === index && slides[ index ].image.id === 0 && (
				<ImageSelectButton
					onSelect={ ( value ) => {
						const newSlides = [ ...slides ];
						newSlides[ index ] = {
							...newSlides[ index ],
							image: {
								id: value.id,
								source_url: value.url,
							},
						};
						setAttributes( {
							slides: newSlides,
						} );
					} }
					value={ slide.image.id }
				/>
			) }
		</>
	);
}

export function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { colorTheme, aspectRatio, grayscaleInactive, autoplay, slides, revealAnimation } =
		attributes;
	const [ swiperIndex, setSwiperIndex ] = useState( 0 );
	const navigationPrevRef = useRef( null );
	const navigationNextRef = useRef( null );

	const swiperProps = {
		wrapperClass: `wp-block-capitola-small-image-slider__swiper-wrapper swiper-wrapper ${
			grayscaleInactive ? ' --grayscale-inactive' : ''
		}`,
		modules: [ Navigation ],
		grabCursor: false,
		speed: 600,
		spaceBetween: 0,
		centeredSlides: true,
		slidesPerView: 'auto',
		coverflowEffect: {
			rotate: aspectRatio === 'square' ? 0 : 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		navigation: {
			nextEl: navigationNextRef.current,
			prevEl: navigationPrevRef.current,
			addIcons: false,
		},
		onSlideChange: ( swiper ) => {
			setSwiperIndex( swiper.activeIndex );
		},
		onBeforeInit: ( swiper ) => {
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			swiper.params.navigation.nextEl = navigationNextRef.current;
		},
	};

	const blockProps = useBlockProps( {
		className: `alignfull --theme-${ colorTheme }`,
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-small-image-slider__width alignfull is-layout-constrained has-global-padding ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Slider Settings" initialOpen={ true }>
					<RadioControl
						label="Aspect Ratio"
						selected={ aspectRatio }
						options={ [
							{ label: 'Square', value: 'square' },
							{ label: 'Landscape', value: 'landscape' },
						] }
						onChange={ ( value ) => {
							setAttributes( { aspectRatio: value } );
						} }
					/>
					<ToggleControl
						label="Autoplay"
						checked={ autoplay }
						onChange={ ( value ) => {
							setAttributes( { autoplay: value } );
						} }
					/>
					<ToggleControl
						label="Grayscale Inactive Slides"
						checked={ grayscaleInactive }
						onChange={ ( value ) => {
							setAttributes( { grayscaleInactive: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<RepeaterBlockControls
				index={ swiperIndex }
				attribute="slides"
				itemLabel="slide"
				newValues={ {
					caption: '',
					image: {
						id: 0,
						source_url: '',
					},
				} }
				props={ props }
				onImageChange={ ( image ) => {
					const newSlides = [ ...slides ];
					newSlides[ swiperIndex ] = {
						...newSlides[ swiperIndex ],
						image: {
							id: image.id,
							source_url: image.url,
						},
					};
					setAttributes( {
						slides: newSlides,
					} );
				} }
				imageValue={ slides[ swiperIndex ].image.id }
			/>

			<div { ...innerBlocksProps }>
				{ children }
				<div className="wp-block-capitola-small-image-slider__slider-parent">
					<Swiper
						key={ aspectRatio }
						className={ `wp-block-capitola-small-image-slider__swiper swiper ${
							aspectRatio === 'square' ? ' --square' : ' --landscape'
						}` }
						{ ...swiperProps }
					>
						{ slides !== null &&
							slides.map( ( slide, index ) => {
								return (
									<SwiperSlide
										key={ index }
										className={ `wp-block-capitola-small-image-slider__swiper-slide swiper-slide ${
											aspectRatio === 'square' ? '--square' : ''
										}` }
										data-slide-index={ index }
									>
										<SlideBody
											slide={ slide }
											index={ index }
											slides={ slides }
											setAttributes={ setAttributes }
											isSelected={ isSelected }
											swiperIndex={ swiperIndex }
										/>
									</SwiperSlide>
								);
							} ) }
						<div className="wp-block-capitola-small-image-slider__nav-buttons">
							<div ref={ navigationNextRef } className="swiper-button-next" />
							<div ref={ navigationPrevRef } className="swiper-button-prev" />
						</div>
					</Swiper>
					{ !! slides[ swiperIndex ] && (
						<RichText
							className="wp-block-capitola-small-image-slider__caption"
							value={ slides[ swiperIndex ].caption }
							placeholder="Caption..."
							onChange={ ( value ) => {
								const newSlides = [ ...slides ];
								newSlides[ swiperIndex ] = {
									...newSlides[ swiperIndex ],
									caption: value,
								};
								setAttributes( { slides: newSlides } );
							} }
						/>
					) }
				</div>
			</div>
		</div>
	);
}
