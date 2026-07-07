import { decodeEntities } from '@wordpress/html-entities';

export default function PostTile( { attributes, conditionals, item } ) {
	return (
		<div className="capitola-result__link">
			<div className="capitola-result__image-col --theme-image-overlay">
				<img src={ item.thumbnail_urls.large } alt="" />
				{ ( conditionals.titleLocation === 'image' ||
					conditionals.ctaLocation === 'image' ) && <div className="__opacity-layer" /> }
				<div className="capitola-result__thumb-content">
					{ conditionals.titleLocation === 'image' && (
						<>
							<div className="capitola-result__thumb-title --hl-s">
								{ item.title.raw }
							</div>
							{ item.event_dates && (
								<div className="capitola-result__thumb-subtitle">
									{ item.event_dates }
								</div>
							) }
						</>
					) }
					{ attributes.ctaText && conditionals.ctaLocation === 'image' && (
						<span className="capitola-result__thumb-cta --cta --tertiary">
							{ attributes.ctaText }
						</span>
					) }
				</div>
				{ conditionals.titleLocation === 'image' && item.category_name && (
					<div className="capitola-result__thumb-cat">
						{ decodeEntities( item.category_name ) }
					</div>
				) }
			</div>
			{ conditionals.hasBottom && (
				<div className="capitola-result__content">
					{ conditionals.titleLocation === 'body' && (
						<div>
							{ item.category_name && (
								<div className="capitola-result__body-cat --eyebrow">
									{ decodeEntities( item.category_name ) }
								</div>
							) }
							<div className="capitola-result__title --hl-s">{ item.title.raw }</div>
							{ item.event_dates && (
								<div className="capitola-result__subtitle">
									{ item.event_dates }
								</div>
							) }
						</div>
					) }
					{ item.excerpt.rendered && conditionals.showExcerpt && (
						<div
							className="capitola-result__excerpt"
							dangerouslySetInnerHTML={ {
								__html: item.excerpt.rendered,
							} }
						/>
					) }
					{ conditionals.showByline && (
						<div className="capitola-result__byline">
							{ item.byline.author_image && (
								<div className="capitola-result__byline-img-wrap">
									<img
										src={ item.byline.author_image }
										alt={ item.byline.name }
									/>
								</div>
							) }
							<div className="capitola-result__byline-date">
								{ item.byline.name } <br /> { item.byline.date }
							</div>
						</div>
					) }
					{ attributes.ctaText && conditionals.ctaLocation === 'body' && (
						<div className="capitola-result__cta --cta --tertiary">
							{ attributes.ctaText }
						</div>
					) }
				</div>
			) }
		</div>
	);
}
