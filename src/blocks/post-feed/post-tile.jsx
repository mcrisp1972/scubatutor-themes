import { decodeEntities } from '@wordpress/html-entities';

export default function postTile( attributes, conditionals, post ) {
	return (
		<div className="capitola-result__link">
			<div className="capitola-result__image-col --theme-image-overlay">
				<img src={ post.thumbnail_urls.large } alt="" />
				{ ( conditionals.titleLocation === 'image' ||
					conditionals.ctaLocation === 'image' ) && <div className="__opacity-layer" /> }
				<div className="capitola-result__thumb-content">
					{ conditionals.titleLocation === 'image' && (
						<>
							<div className="capitola-result__thumb-title --hl-s">
								{ post.title.raw }
							</div>
							{ post.event_dates && (
								<div className="capitola-result__thumb-subtitle">
									{ post.event_dates }
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
				{ conditionals.titleLocation === 'image' && post.category_name && (
					<div className="capitola-result__thumb-cat">
						{ decodeEntities( post.category_name ) }
					</div>
				) }
			</div>
			{ conditionals.hasBottom && (
				<div className="capitola-result__content">
					{ conditionals.titleLocation === 'body' && (
						<div>
							{ post.category_name && (
								<div className="capitola-result__body-cat --eyebrow">
									{ decodeEntities( post.category_name ) }
								</div>
							) }
							<div className="capitola-result__title --hl-s">{ post.title.raw }</div>
							{ post.event_dates && (
								<div className="capitola-result__subtitle">
									{ post.event_dates }
								</div>
							) }
						</div>
					) }
					{ post.excerpt.rendered && conditionals.showExcerpt && (
						<div
							className="capitola-result__excerpt"
							dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } }
						/>
					) }
					{ conditionals.showByline && (
						<div className="capitola-result__byline">
							{ post.byline.author_image && (
								<div className="capitola-result__byline-img-wrap">
									<img
										src={ post.byline.author_image }
										alt={ post.byline.name }
									/>
								</div>
							) }
							<div className="capitola-result__byline-date">
								{ post.byline.name } <br /> { post.byline.date }
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
