import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import {
	ColorThemePanel,
	AnimationPanel,
	RepeaterBlockControls,
	ImageSelectButton,
	CtaControl,
	PlaceholderImage,
	IntroAlignToolbar,
	AspectRatioToolbar,
	RadiusToolbar,
	animationPreviewClass,
} from '@capitola/editor-controls';

import {
	Navigation,
	Pagination,
	EffectFade,
	EffectCreative,
	Autoplay,
	Thumbs,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef } from '@wordpress/element';

function SlideBody( { slide, index, slides, setAttributes, isSelected, swiperIndex } ) {
	return (
		<>
			{ slide.image.source_url && <img src={ slide.image.source_url } alt="" /> }
			{ ! slide.image.source_url && <PlaceholderImage /> }
			{ isSelected && swiperIndex === index && slides[ index ].image === 0 && (
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
			{ slide.image.id !== 0 && (
				<div className="wp-block-capitola-full-width-slider__slide-caption">
					<RichText
						tagName="p"
						className="--text-s"
						value={ slide.caption }
						placeholder="Caption..."
						onChange={ ( value ) => {
							const newSlides = [ ...slides ];
							newSlides[ index ] = {
								...newSlides[ index ],
								caption: value,
							};
							setAttributes( {
								slides: newSlides,
							} );
						} }
					/>
					<CtaControl
						className="wp-block-capitola-full-width-slider__slide-cta --cta --tertiary"
						value={ slide.link }
						placeholder="Link..."
						onChange={ ( value ) => {
							const newSlides = [ ...slides ];
							newSlides[ index ] = {
								...newSlides[ index ],
								link: value,
							};
							setAttributes( {
								slides: newSlides,
							} );
						} }
					/>
				</div>
			) }
		</>
	);
}

export function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const {
		introAlign,
		colorTheme,
		sliderRadius,
		aspectRatio,
		autoplay,
		navigation,
		transition,
		stickySlider,
		slides,
		revealAnimation,
	} = attributes;
	const [ swiperIndex, setSwiperIndex ] = useState( 0 );
	const swiperRef = useRef( null );
	const navigationPrevRef = useRef( null );
	const navigationNextRef = useRef( null );
	const paginationRef = useRef( null );

	const [ thumbsSwiper, setThumbsSwiper ] = useState( null );

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-full-width-slider__width alignwide --has-${ introAlign }-intro ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	const radiusClass = sliderRadius !== 'none' ? ` --has-${ sliderRadius }-radius` : '';
	const stickyClass = stickySlider ? ' --sticky' : '';

	let swiperEffect;
	if ( transition === 'fade' ) {
		swiperEffect = 'fade';
	} else if ( transition === 'stack' ) {
		swiperEffect = 'creative';
	} else {
		swiperEffect = 'slide';
	}

	const swiperProps = {
		onSwiper: ( swiper ) => {
			return ( swiperRef.current = swiper );
		},
		modules: [ Navigation, Pagination, Thumbs, Autoplay, EffectFade, EffectCreative ],
		loop: false,
		spaceBetween: 0,
		speed: transition === 'fade' ? 2000 : 600,
		grabCursor: true,
		allowTouchMove: true,
		navigation: {
			nextEl: navigationNextRef.current,
			prevEl: navigationPrevRef.current,
			addIcons: false,
		},
		pagination: {
			el: paginationRef.current,
			clickable: true,
		},
		onBeforeInit: ( swiper ) => {
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			swiper.params.navigation.nextEl = navigationNextRef.current;
			swiper.params.pagination.el = paginationRef.current;
		},
		autoplay: false,
		effect: swiperEffect,
		fadeEffect:
			transition === 'fade'
				? {
						crossFade: true,
				  }
				: false,
		creativeEffect:
			transition === 'stack'
				? {
						prev: {
							shadow: true,
							translate: [ '-20%', 0, -1 ],
						},
						next: {
							translate: [ '100%', 0, 0 ],
						},
				  }
				: false,
		thumbs: { swiper: thumbsSwiper },
		onSlideChange: ( swiper ) => {
			setSwiperIndex( swiper.realIndex );
		},
	};

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Slider Settings" initialOpen={ true }>
					<RadioControl
						label="Transition"
						selected={ transition }
						options={ [
							{ label: 'Slide', value: 'slide' },
							{ label: 'Fade', value: 'fade' },
							{ label: 'Stack', value: 'stack' },
						] }
						onChange={ ( value ) => {
							setAttributes( { transition: value } );
						} }
						help="Transition preview may require a save and re-load of the page."
					/>
					<ToggleControl
						label="Autoplay"
						checked={ autoplay }
						onChange={ ( value ) => {
							setAttributes( { autoplay: value } );
						} }
					/>
					<RadioControl
						label="Navigation"
						selected={ navigation }
						options={ [
							{ label: 'Bullets', value: 'bullets' },
							{ label: 'Arrows', value: 'arrows' },
							{ label: 'Thumbnails', value: 'thumbnails' },
						] }
						onChange={ ( value ) => {
							setAttributes( { navigation: value } );
						} }
					/>
					<ToggleControl
						label="Sticky Slider"
						checked={ stickySlider }
						onChange={ ( value ) => {
							setAttributes( { stickySlider: value } );
						} }
						help="Sticky slider will not work if scroll animations are set."
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } sections={ [ 'block', 'body', 'figure' ] } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'left', 'right' ] }
					/>
					<AspectRatioToolbar
						props={ props }
						attribute="aspectRatio"
						options={ [ '16-9', '3-2', '4-3' ] }
					/>
					<RadiusToolbar
						props={ props }
						attribute="sliderRadius"
						options={ [ 'none', 'xsmall', 'small', 'medium', 'large' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<RepeaterBlockControls
				index={ swiperIndex }
				attribute="slides"
				itemLabel="slide"
				props={ props }
				newValues={ {
					caption: '',
					image: {
						id: 0,
						source_url: '',
					},
					link: {},
				} }
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
				onAddAfter={ () => {
					if ( swiperRef.current ) {
						swiperRef.current.slideTo( swiperIndex + 1 );
					}
				} }
			/>
			<div { ...innerBlocksProps }>
				{ children }
				<div
					className={ `wp-block-capitola-full-width-slider__sliders ${ stickyClass } ${ animationPreviewClass(
						revealAnimation,
						'figure'
					) }` }
				>
					<div className="wp-block-capitola-full-width-slider__main">
						<Swiper
							key={ transition }
							className={ radiusClass }
							style={ {
								borderRadius: `var(--wp--preset--border-radius--${ sliderRadius })`,
							} }
							{ ...swiperProps }
						>
							{ slides !== null &&
								slides.map( ( slide, index ) => {
									return (
										<SwiperSlide
											key={ index }
											className="--theme-image-overlay"
											style={ {
												aspectRatio: `var(--wp--preset--aspect-ratio--${ aspectRatio })`,
											} }
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
							<div
								ref={ navigationPrevRef }
								className="swiper-button-prev"
								style={
									navigation === 'arrows' || navigation === 'thumbnails'
										? {}
										: { display: 'none' }
								}
							/>
							<div
								ref={ navigationNextRef }
								className="swiper-button-next"
								style={
									navigation === 'arrows' || navigation === 'thumbnails'
										? {}
										: { display: 'none' }
								}
							/>
							<div
								ref={ paginationRef }
								className="swiper-pagination"
								style={ navigation === 'bullets' ? {} : { display: 'none' } }
							/>
						</Swiper>
					</div>
					{ navigation === 'thumbnails' && (
						<div className="wp-block-capitola-full-width-slider__thumbs">
							<Swiper
								modules={ [ Thumbs ] }
								slidesPerView={ slides.length < 6 ? slides.length : 6 }
								loop={ true }
								grabCursor={ true }
								allowTouchMove={ true }
								watchSlidesProgress
								onSwiper={ setThumbsSwiper }
							>
								{ slides !== null &&
									slides.map( ( slide, index ) => {
										return (
											<SwiperSlide key={ index }>
												{ slide.image.source_url && (
													<img src={ slide.image.source_url } alt="" />
												) }
											</SwiperSlide>
										);
									} ) }
							</Swiper>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
