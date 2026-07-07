import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { layoutConditionals } from './layout-conditionals';
import { animationPreviewClass } from '@capitola/editor-controls';

function SwiperTemplate( { attributes, CardTemplate, items } ) {
	const { showSlideCount } = attributes;
	const navigationPrevRef = useRef( null );
	const navigationNextRef = useRef( null );
	const paginationRef = useRef( null );

	const swiperProps = {
		wrapperClass: 'capitola-listings__list --sidescroll',
		style: { '--wp--custom--truncate-lines': attributes.excerptLines },
		modules: [ Navigation, Pagination ],
		navigation: {
			nextEl: navigationNextRef.current,
			prevEl: navigationPrevRef.current,
			addIcons: false,
		},
		pagination: showSlideCount
			? {
					el: paginationRef.current,
					type: 'custom',
					renderCustom: ( swiper, current, total ) => {
						return current + ' of ' + total;
					},
			  }
			: false,
		speed: 800,
		slidesPerGroup: 1,
		slidesPerGroupAuto: true,
		slidesPerView: 'auto',
		onBeforeInit: ( swiper ) => {
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			swiper.params.navigation.nextEl = navigationNextRef.current;
			swiper.params.pagination.el = paginationRef.current;
		},
	};

	return (
		<Swiper className="capitola-listings__sidescroll" { ...swiperProps }>
			{ items.map( ( term ) => {
				return (
					<SwiperSlide key={ term.id } className="capitola-result">
						<CardTemplate
							attributes={ attributes }
							conditionals={ layoutConditionals( attributes ) }
							item={ term }
						/>
					</SwiperSlide>
				);
			} ) }
			<div className="capitola-listings__scroll-buttons">
				<button
					ref={ navigationPrevRef }
					className="swiper-button-prev"
					aria-label="scroll-left"
				/>
				{ showSlideCount && <div ref={ paginationRef } className="swiper-pagination" /> }
				<button
					ref={ navigationNextRef }
					className="swiper-button-next"
					aria-label="scroll-right"
				/>
			</div>
		</Swiper>
	);
}

function GridTemplate( { attributes, CardTemplate, items } ) {
	const { listLayout } = attributes;
	return (
		<div className="capitola-listings__sidescroll">
			<div
				className={ `capitola-listings__list --${ listLayout }` }
				style={ {
					'--wp--custom--truncate-lines': attributes.excerptLines,
				} }
			>
				{ items.map( ( item, index ) => {
					return (
						<article key={ index } className="capitola-result">
							<CardTemplate
								attributes={ attributes }
								conditionals={ layoutConditionals( attributes ) }
								item={ item }
							/>
						</article>
					);
				} ) }
			</div>
		</div>
	);
}

export default function PostFeedTemplate( {
	props,
	items,
	CardTemplate,
	noResultsMsg = 'No Results Found. The block will not be displayed.',
} ) {
	const { attributes } = props;
	const { listLayout, revealAnimation } = attributes;
	const hasSlider = listLayout === 'sidescroll';

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `capitola-listings__width alignwide ${ animationPreviewClass(
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
		<div { ...innerBlocksProps }>
			{ children }
			{ ( () => {
				if ( ! items ) {
					return <div className="--spinner" />;
				} else if ( items.length === 0 ) {
					return <p className="--block-notice">{ noResultsMsg }</p>;
				} else if ( hasSlider ) {
					return (
						<SwiperTemplate
							attributes={ attributes }
							CardTemplate={ CardTemplate }
							items={ items }
						/>
					);
				}
				return (
					<GridTemplate
						attributes={ attributes }
						CardTemplate={ CardTemplate }
						items={ items }
					/>
				);
			} )() }
		</div>
	);
}
