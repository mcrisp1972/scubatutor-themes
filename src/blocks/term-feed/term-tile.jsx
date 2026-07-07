import { decodeEntities } from '@wordpress/html-entities';

export default function TermTile( { attributes, conditionals, item } ) {
	return (
		<div className="capitola-result__link">
			<div className="capitola-result__image-col --theme-image-overlay">
				{ item.thumbnail_urls.large && <img src={ item.thumbnail_urls.large } alt="" /> }
				{ conditionals.titleLocation === 'image' && (
					<div className="__opacity-layer"></div>
				) }
				<div className="capitola-result__thumb-content">
					{ conditionals.titleLocation === 'image' && (
						<div className="capitola-result__thumb-title --hl-s">
							{ decodeEntities( item.name ) }
						</div>
					) }
					{ attributes.ctaText && conditionals.ctaLocation === 'image' && (
						<span className="capitola-result__thumb-cta --cta --tertiary">
							{ attributes.ctaText }
						</span>
					) }
				</div>
			</div>
			{ conditionals.hasBottom && (
				<div className="capitola-result__content">
					{ conditionals.titleLocation === 'body' && (
						<div className="capitola-result__title --hl-s">
							{ decodeEntities( item.name ) }
						</div>
					) }
					{ conditionals.showExcerpt && item.description && (
						<div className="capitola-result__excerpt">
							{ decodeEntities( item.description ) }
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
