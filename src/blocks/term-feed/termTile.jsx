import { decodeEntities } from '@wordpress/html-entities';

export default function termTile( attributes, conditionals, term ) {
	return (
		<div className="cwps-result__link">
			<div className="cwps-result__image-col --theme-image-overlay">
				{ term.thumbnail_urls.large && <img src={ term.thumbnail_urls.large } alt="" /> }
				{ conditionals.titleLocation === 'image' && <div className="__opacity-layer"></div> }
				<div className="cwps-result__thumb-content">
					{ conditionals.titleLocation === 'image' && (
						<div className="cwps-result__thumb-title --hl-s">{ decodeEntities( term.name ) }</div>
					) }
					{ attributes.ctaText && conditionals.ctaLocation === 'image' && (
						<span className="cwps-result__thumb-cta --cta --tertiary">{ attributes.ctaText }</span>
					) }
				</div>
			</div>
			{ conditionals.hasBottom && (
				<div className="cwps-result__content">
					{ conditionals.titleLocation === 'body' && (
						<div className="cwps-result__title --hl-s">{ decodeEntities( term.name ) }</div>
					) }
					{ conditionals.showExcerpt && term.description && (
						<div className="cwps-result__excerpt">{ decodeEntities( term.description ) }</div>
					) }
					{ attributes.ctaText && conditionals.ctaLocation === 'body' && (
						<div className="cwps-result__cta --cta --tertiary">{ attributes.ctaText }</div>
					) }
				</div>
			) }
		</div>
	);
}
