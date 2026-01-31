/* eslint-disable import/no-unresolved */
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { layoutConditionals } from './layoutConditionals';

export default function postFeedTemplate( props, items, cardTemplate ) {
	const { attributes } = props;
	const { listLayout, showSlideCount } = attributes;
	const hasSlider = listLayout === 'sidescroll';
	const navigationPrevRef = useRef( null );
	const navigationNextRef = useRef( null );
	const paginationRef = useRef( null );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: 'cwps-listings__width alignwide',
		},
		{
			template: [ [ 'cwps/body-text' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...innerBlocksProps }>
			{ children }
			{ ! items ? (
				<div className="--spinner" />
			) : items.length === 0 ? (
				<p className="--block-notice">No Results Found. The block will not be displayed.</p>
			) : hasSlider ? (
				<Swiper
					className="cwps-listings__sidescroll"
					wrapperClass="cwps-listings__list --sidescroll"
					style={ { '--capitola-excerpt-lines': attributes.excerptLines } }
					modules={ [ Navigation, Pagination ] }
					navigation={ {
						nextEl: navigationNextRef.current,
						prevEl: navigationPrevRef.current,
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
							<SwiperSlide key={ i.id } className="cwps-result">
								{ cardTemplate( attributes, layoutConditionals( attributes ), i ) }
							</SwiperSlide>
						);
					} ) }
					<div className="cwps-listings__scroll-buttons">
						<button ref={ navigationPrevRef } className="swiper-button-prev" aria-label="scroll-left" />
						{ showSlideCount && <div ref={ paginationRef } className="swiper-pagination" /> }
						<button ref={ navigationNextRef } className="swiper-button-next" aria-label="scroll-right" />
					</div>
				</Swiper>
			) : (
				<div className="cwps-listings__sidescroll">
					<div
						className={ `cwps-listings__list --${ listLayout }` }
						style={ { '--capitola-excerpt-lines': attributes.excerptLines } }
					>
						{ items.map( ( i, index ) => {
							return (
								<article key={ index } className="cwps-result">
									{ cardTemplate( attributes, layoutConditionals( attributes ), i, index ) }
								</article>
							);
						} ) }
					</div>
				</div>
			) }
		</div>
	);
}
