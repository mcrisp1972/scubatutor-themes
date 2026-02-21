import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { applyFilters } from '@wordpress/hooks';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	LabeledSpinner,
	TruncateControl,
} from '../../editor-controls';
import postTile from './post-tile';
import PostFeedTemplate from './post-feed-template';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

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

	return (
		<div
			{ ...useBlockProps( {
				className: `capitola-listings alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
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
						__nextHasNoMarginBottom
					/>
					{ listLayout === 'sidescroll' && (
						<ToggleControl
							label="Show Slide Count"
							checked={ showSlideCount }
							onChange={ ( value ) => {
								setAttributes( { showSlideCount: value } );
							} }
							__nextHasNoMarginBottom
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
						__nextHasNoMarginBottom
					/>
					{ listLayout !== 'row' && (
						<ToggleControl
							label="Show Excerpt"
							checked={ showExcerpt }
							onChange={ ( value ) => {
								setAttributes( { showExcerpt: value } );
							} }
							__nextHasNoMarginBottom
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
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<InspectorControls group="settings">
				<PanelBody title="Query Options" initialOpen={ true }>
					{ ! terms && <LabeledSpinner label="Category" /> }
					{ !! terms && (
						<SelectControl
							multiple
							label="Category"
							value={ postCategory }
							options={ [
								{ label: 'All', value: 0 },
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
							__nextHasNoMarginBottom
						/>
					) }
					<TextControl
						type="number"
						min="1"
						label="Limit"
						value={ limit }
						onChange={ ( value ) => {
							setAttributes( { limit: parseInt( value ) } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
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
				</PanelBody>
				<PanelBody title="Markup" initialOpen={ false }>
					<TagSelect
						label="Card Title Tag"
						value={ titleTag }
						onChange={ ( value ) => {
							setAttributes( { titleTag: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ PostFeedTemplate( props, posts, postTile ) }
		</div>
	);
}
