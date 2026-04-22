import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { layoutConditionals } from './layout-conditionals';

function SwiperTemplate( { attributes, cardTemplate, items } ) {
	const { showSlideCount } = attributes;
	const navigationPrevRef = useRef( null );
	const navigationNextRef = useRef( null );
	const paginationRef = useRef( null );

	return (
		<Swiper
			className="capitola-listings__sidescroll"
			wrapperClass="capitola-listings__list --sidescroll"
			style={ { '--capitola-excerpt-lines': attributes.excerptLines } }
			modules={ [ Navigation, Pagination ] }
			navigation={ {
				nextEl: navigationNextRef.current,
				prevEl: navigationPrevRef.current,
				addIcons: false,
			} }
			pagination={
				showSlideCount
					? {
							el: paginationRef.current,
							type: 'custom',
							renderCustom: ( swiper, current, total ) => {
								return current + ' of ' + total;
							},
					  }
					: false
			}
			speed={ 800 }
			slidesPerGroup={ 1 }
			slidesPerGroupAuto={ true }
			slidesPerView="auto"
			onBeforeInit={ ( swiper ) => {
				swiper.params.navigation.prevEl = navigationPrevRef.current;
				swiper.params.navigation.nextEl = navigationNextRef.current;
				swiper.params.pagination.el = paginationRef.current;
			} }
		>
			{ items.map( ( i ) => {
				return (
					<SwiperSlide key={ i.id } className="capitola-result">
						{ cardTemplate( attributes, layoutConditionals( attributes ), i ) }
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

function GridTemplate( { attributes, cardTemplate, items } ) {
	const { listLayout } = attributes;
	return (
		<div className="capitola-listings__sidescroll">
			<div
				className={ `capitola-listings__list --${ listLayout }` }
				style={ {
					'--capitola-excerpt-lines': attributes.excerptLines,
				} }
			>
				{ items.map( ( i, index ) => {
					return (
						<article key={ index } className="capitola-result">
							{ cardTemplate(
								attributes,
								layoutConditionals( attributes ),
								i,
								index
							) }
						</article>
					);
				} ) }
			</div>
		</div>
	);
}

export default function PostFeedTemplate( props, items, cardTemplate ) {
	const { attributes } = props;
	const { listLayout } = attributes;
	const hasSlider = listLayout === 'sidescroll';

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: 'capitola-listings__width alignwide',
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
					return (
						<p className="--block-notice">
							No Results Found. The block will not be displayed.
						</p>
					);
				} else if ( hasSlider ) {
					return (
						<SwiperTemplate
							attributes={ attributes }
							cardTemplate={ cardTemplate }
							items={ items }
						/>
					);
				}
				return (
					<GridTemplate
						attributes={ attributes }
						cardTemplate={ cardTemplate }
						items={ items }
					/>
				);
			} )() }
		</div>
	);
}
