/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RadioControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import { TagSelect, ColorThemePanel, TruncateControl } from '@capitola/editor-controls';
import PostTile from '@capitola/blocks/post-feed/post-tile';
import { layoutConditionals } from '@capitola/blocks/post-feed/layout-conditionals';

export function Edit( props ) {
	const { attributes, setAttributes, name } = props;

	const {
		colorTheme,
		listLayout,
		headline,
		headlineTag,
		titleTag,
		ctaText,
		titleLocation,
		showExcerpt,
		excerptLines,
		limit,
	} = attributes;

	const { posts } = useSelect(
		( select ) => {
			const postArgs = {
				per_page: limit,
				orderby: 'id',
				order: 'desc',
			};

			return {
				posts: select( 'core' ).getEntityRecords( 'postType', 'post', postArgs ),
			};
		},
		[ limit ]
	);
	const blockProps = useBlockProps( {
		className: `alignfull capitola-listings is-layout-constrained has-global-padding js-paginatedListings --theme-${ colorTheme }`,
	} );

	const defaultAttributes = getBlockType( name ).attributes;

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<ToolsPanel
					label="H-Tags"
					resetAll={ () => {
						setAttributes( {
							titleTag: defaultAttributes.titleTag.default,
							headlineTag: defaultAttributes.headlineTag.default,
						} );
					} }
				>
					<ToolsPanelItem
						label="Headline Tag"
						hasValue={ () => {
							return headlineTag !== defaultAttributes.headlineTag.default;
						} }
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								headlineTag: defaultAttributes.headlineTag.default,
							} );
						} }
					>
						<TagSelect
							label="Headline Tag"
							value={ headlineTag }
							onChange={ ( value ) => {
								setAttributes( { headlineTag: value } );
							} }
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						label="Card Title Tag"
						hasValue={ () => {
							return titleTag !== defaultAttributes.titleTag.default;
						} }
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								titleTag: defaultAttributes.titleTag.default,
							} );
						} }
					>
						<TagSelect
							label="Card Title Tag"
							value={ titleTag }
							onChange={ ( value ) => {
								setAttributes( { titleTag: value } );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="Listing Layout" initialOpen={ true }>
					<SelectControl
						label="Layout"
						value={ listLayout }
						options={ [
							{ label: 'Rows', value: 'row' },
							{ label: 'Squares', value: 'card' },
							{ label: '2 Columns', value: 'column-2' },
							{ label: '3 Columns', value: 'column-3' },
							{ label: 'Masonry', value: 'masonry' },
							{ label: 'Sidescroll', value: 'sidescroll' },
						] }
						onChange={ ( value ) => {
							setAttributes( { listLayout: value } );
						} }
						__next40pxDefaultSize
					/>
					<TextControl
						label="CTA Text"
						value={ ctaText }
						help="Leave blank for no CTA"
						onChange={ ( value ) => {
							setAttributes( { ctaText: value } );
						} }
						__next40pxDefaultSize
					/>
					{ listLayout !== 'row' && (
						<ToggleControl
							label="Show Excerpt"
							checked={ showExcerpt }
							onChange={ ( value ) => {
								setAttributes( { showExcerpt: value } );
							} }
						/>
					) }
					{ showExcerpt && (
						<TruncateControl
							value={ excerptLines }
							onChange={ ( value ) => {
								setAttributes( { excerptLines: value } );
							} }
						/>
					) }
					{ listLayout !== 'row' && (
						<RadioControl
							label="Title Location"
							selected={ titleLocation }
							options={ [
								{ label: 'Over Image', value: 'image' },
								{ label: 'Under Image', value: 'body' },
							] }
							onChange={ ( value ) => {
								setAttributes( { titleLocation: value } );
							} }
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
			</InspectorControls>
			<div className="capitola-listings__width alignwide">
				<div className="wp-block-capitola-search-listings__search-head">
					<RichText
						className="wp-block-capitola-search-listings__headline --hl-l"
						value={ headline }
						allowedFormats={ [] }
						placeholder="Headline..."
						onChange={ ( value ) => {
							setAttributes( { headline: value } );
						} }
					/>
					<form className="wp-block-capitola-search-listings__search-form" action="/">
						<input
							type="search"
							name="s"
							value=""
							aria-label="search"
							placeholder="What are you looking for?"
						/>
						<button type="button" className="search-icon" />
					</form>
					<div className="wp-block-capitola-search-listings__search-count">
						We found # results in your search.
					</div>
				</div>
				{ ! posts && <div className="--spinner" /> }
				{ posts && posts.length === 0 && 'No Posts Found' }
				{ posts && posts.length > 0 && (
					<div className={ 'capitola-listings__list --' + listLayout }>
						{ posts.map( ( post, index ) => {
							return (
								<article key={ index } className="capitola-result">
									<PostTile
										attributes
										conditionals={ layoutConditionals( {
											...attributes,
											...{ postType: post.type },
										} ) }
										item={ post }
									/>
								</article>
							);
						} ) }
					</div>
				) }
				<div className="capitola-page-nav js-pageNav">
					<button className="capitola-page-nav__button --next js-navPrev" disabled="">
						Prev
					</button>
					<ul className="capitola-page-nav__page-numbers js-navPageNumbers">
						<li className="capitola-page-nav__button --number --current">1</li>
						<li>
							<button
								className="capitola-page-nav__button --number js-navPageNum"
								data-page="2"
								type="button"
							>
								2
							</button>
						</li>
						<li>
							<button
								className="capitola-page-nav__button --number js-navPageNum"
								data-page="3"
								type="button"
							>
								3
							</button>
						</li>
						<li>
							<button
								className="capitola-page-nav__button --number js-navPageNum"
								data-page="4"
								type="button"
							>
								4
							</button>
						</li>
					</ul>
					<button className="capitola-page-nav__button --prev js-navNext">Next</button>
				</div>
			</div>
		</div>
	);
}
