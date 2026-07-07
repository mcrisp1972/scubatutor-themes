/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	SelectControl,
	ToggleControl,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { getBlockType, store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { applyFilters } from '@wordpress/hooks';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	LabeledSpinner,
	TruncateControl,
} from '@capitola/editor-controls';
import PostTile from './post-tile';
import PostFeedTemplate from './post-feed-template';

export function Edit( props ) {
	const { name, attributes, setAttributes } = props;

	const {
		listLayout,
		showSlideCount,
		orderBy,
		order,
		orderingOptions,
		titleTag,
		ctaText,
		showExcerpt,
		excerptLines,
		titleLocation,
		showByline,
		postType,
		postCategory,
		futureOnly,
		limit,
		colorTheme,
	} = attributes;

	const postTypeCats = applyFilters( 'capitola.postTypeCats' );

	const defaultAttributes = getBlockType( name ).attributes;

	const blockDefaults = Object.fromEntries(
		Object.entries( defaultAttributes ?? {} ).map( ( [ key, def ] ) => {
			return [ key, def?.default ];
		} )
	);

	const activeVariation = useSelect(
		( select ) => {
			return select( blocksStore ).getActiveBlockVariation( name, attributes );
		},
		[ name, attributes ]
	);

	const effectiveDefaults = {
		...blockDefaults,
		...( activeVariation?.attributes ?? {} ),
	};

	const posts = useSelect(
		( select ) => {
			const postArgs = {
				per_page: limit,
				orderby: orderBy,
				order,
			};

			if ( futureOnly ) {
				postArgs.future_only = '1';
			}

			if ( parseInt( postCategory ) !== 0 ) {
				if ( postType === 'post' ) {
					postArgs.categories = postCategory;
				} else {
					postArgs[ postTypeCats[ postType ] ] = postCategory;
				}
			}

			return select( 'core' ).getEntityRecords( 'postType', postType, postArgs );
		},
		[ futureOnly, limit, order, orderBy, postCategory, postType, postTypeCats ]
	);

	const terms = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'taxonomy', postTypeCats[ postType ], {
				per_page: -1,
				orderby: 'name',
				order: 'asc',
			} );
		},
		[ postType, postTypeCats ]
	);
	const blockProps = useBlockProps( {
		className: `capitola-listings alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	return (
		<div { ...blockProps }>
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
					{ listLayout === 'sidescroll' && (
						<ToggleControl
							label="Show Slide Count"
							checked={ showSlideCount }
							onChange={ ( value ) => {
								setAttributes( { showSlideCount: value } );
							} }
						/>
					) }
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
					{ postType === 'post' && (
						<ToggleControl
							label="Show Byline"
							checked={ showByline }
							onChange={ ( value ) => {
								setAttributes( { showByline: value } );
							} }
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<InspectorControls group="settings">
				<ToolsPanel
					label="Query Options"
					resetAll={ () => {
						setAttributes( {
							postCategory: effectiveDefaults?.postCategory,
							limit: effectiveDefaults?.limit,
							orderBy: effectiveDefaults?.orderBy,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => {
							return postCategory.length > 0;
						} }
						isShownByDefault={ true }
						label="Category"
						onDeselect={ () => {
							setAttributes( {
								postCategory: effectiveDefaults?.postCategory,
							} );
						} }
					>
						{ ! terms && <LabeledSpinner label="Category" /> }
						{ !! terms && (
							<SelectControl
								multiple
								label="Category"
								value={ postCategory }
								options={ [
									...terms.map( ( i ) => {
										return {
											label: decodeEntities( i.name ),
											value: i.id,
										};
									} ),
								] }
								onChange={ ( value ) => {
									setAttributes( { postCategory: value } );
								} }
								__next40pxDefaultSize
							/>
						) }
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return effectiveDefaults?.limit !== limit;
						} }
						label="Limit"
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								limit: effectiveDefaults?.limit,
							} );
						} }
					>
						<TextControl
							type="number"
							min="1"
							label="Limit"
							value={ limit }
							onChange={ ( value ) => {
								setAttributes( { limit: parseInt( value ) } );
							} }
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return effectiveDefaults?.orderBy !== orderBy;
						} }
						label="Ordering"
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								orderBy: effectiveDefaults?.orderBy,
							} );
						} }
					>
						<RadioControl
							label="Ordering"
							selected={ orderBy }
							options={ orderingOptions }
							onChange={ ( value ) => {
								let newOrder;
								if ( value === 'event_date' || value === 'title' ) {
									newOrder = 'asc';
								} else {
									newOrder = 'desc';
								}
								setAttributes( {
									orderBy: value,
									order: newOrder,
								} );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
				<ToolsPanel
					label="H-Tags"
					resetAll={ () => {
						setAttributes( {
							titleTag: defaultAttributes.titleTag.default,
						} );
					} }
				>
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
			<PostFeedTemplate props={ props } items={ posts } CardTemplate={ PostTile } />
		</div>
	);
}
