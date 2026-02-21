import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import {
	PanelBody,
	RadioControl,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	LabeledSpinner,
	TruncateControl,
} from '../../editor-controls';
import postTile from '../post-feed/post-tile';
import buildTermsTree from '../../scripts/modules/term-tree';
import { layoutConditionals } from '../post-feed/layout-conditionals';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		colorTheme,
		listLayout,
		orderBy,
		order,
		titleTag,
		ctaText,
		showExcerpt,
		excerptLines,
		titleLocation,
		showByline,
		postType,
		baseTaxonomy,
		baseTerm,
		limit,
		postTypes,
		showTaxFilters,
		showSorts,
		showSearchFields,
		setHiddens,
		orderbyOptions,
		taxParams,
	} = attributes;

	const taxonomies = useSelect(
		( select ) => {
			return postType
				? select( 'core' ).getTaxonomies( {
						type: postType,
						per_page: 100,
				  } )
				: undefined;
		},
		[ postType ]
	);

	const posts = useSelect(
		( select ) => {
			const postArgs = {
				per_page: limit,
				orderby: orderBy,
				order,
				filtered_listings: true,
			};

			if ( baseTaxonomy && baseTerm !== '0' ) {
				postArgs[ taxParams[ baseTaxonomy ] ] = [ baseTerm ];
			}

			setHiddens.forEach( ( hidden ) => {
				postArgs[ hidden ] = postTypes[ postType ].hiddenParams[ hidden ].default;
			} );

			return select( 'core' ).getEntityRecords( 'postType', postType, postArgs );
		},
		[
			limit,
			orderBy,
			order,
			baseTaxonomy,
			baseTerm,
			setHiddens,
			postType,
			taxParams,
			postTypes,
		]
	);

	const terms = useSelect(
		( select ) => {
			const tax = baseTaxonomy ? baseTaxonomy : false;

			return tax
				? select( 'core' ).getEntityRecords( 'taxonomy', tax, {
						per_page: -1,
						orderby: 'name',
						order: 'asc',
				  } )
				: false;
		},
		[ baseTaxonomy ]
	);

	const getOrderOptions = () => {
		const sorts = postTypes[ postType ].sorts;

		return sorts.map( ( orderby ) => {
			const sort = orderbyOptions[ orderby ];
			return { label: sort.label, value: orderby };
		} );
	};

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
		<div
			{ ...useBlockProps( {
				className: `alignfull capitola-listings --paginated is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="settings">
				<PanelBody title="Query Options" initialOpen={ true }>
					<SelectControl
						label="Post Type"
						value={ postType }
						options={ [
							...Object.keys( postTypes ).map( ( i ) => {
								return { label: postTypes[ i ].name, value: i };
							} ),
						] }
						onChange={ ( value ) => {
							setAttributes( {
								postType: value,
								baseTaxonomy: !! postTypes[ value ].taxonomies
									? postTypes[ value ].taxonomies[ 0 ]
									: '',
								baseTerm: 0,
								showTaxFilters: postTypes[ value ].taxonomies,
								showSearchFields: !! postTypes[ value ].searchParams
									? Object.keys( postTypes[ value ].searchParams )
									: [],
								setHiddens: !! postTypes[ value ].hiddenParams
									? Object.keys( postTypes[ value ].hiddenParams )
									: [],
								orderBy: postTypes[ value ].sorts[ 0 ],
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					{ !! postTypes[ postType ].hiddenParams &&
						Object.keys( postTypes[ postType ].hiddenParams ).map( ( slug ) => {
							const hidden = postTypes[ postType ].hiddenParams[ slug ];
							return (
								<ToggleControl
									key={ slug }
									label={ hidden.label }
									checked={ !! setHiddens ? setHiddens.includes( slug ) : false }
									onChange={ ( value ) => {
										let newValue = [ ...setHiddens ];
										if ( value && ! newValue.includes( slug ) ) {
											newValue.push( slug );
										} else if ( ! value && newValue.includes( slug ) ) {
											newValue = newValue.filter( function ( hiddenItem ) {
												return hiddenItem !== slug;
											} );
										}
										setAttributes( {
											setHiddens: newValue,
										} );
									} }
									__nextHasNoMarginBottom
								/>
							);
						} ) }
					{ terms !== false && ! terms && <LabeledSpinner label="Category" /> }
					{ !! terms && terms.length && (
						<SelectControl
							label="Category"
							value={ baseTerm }
							options={ [
								{ label: 'All', value: 0 },
								...buildTermsTree( terms ).map( ( i ) => {
									return {
										label: decodeEntities( i.name ),
										value: i.id,
									};
								} ),
							] }
							onChange={ ( value ) => {
								setAttributes( { baseTerm: value } );
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
						label="Order By"
						selected={ orderBy }
						options={ getOrderOptions() }
						onChange={ ( value ) => {
							setAttributes( {
								orderBy: value,
								order: orderbyOptions[ value ].order,
							} );
						} }
					/>
				</PanelBody>
				<PanelBody title="Filters" initialOpen={ false }>
					{ !! postTypes[ postType ]?.searchParams &&
						Object.keys( postTypes[ postType ].searchParams ).map( ( slug ) => {
							return (
								<ToggleControl
									key={ slug }
									label={ postTypes[ postType ].searchParams[ slug ].label }
									checked={ showSearchFields.includes( slug ) ? true : false }
									onChange={ ( value ) => {
										let newValue = [ ...showSearchFields ];
										if ( value && ! newValue.includes( slug ) ) {
											newValue.push( slug );
										} else if ( ! value && newValue.includes( slug ) ) {
											newValue = newValue.filter( function ( cat ) {
												return cat !== slug;
											} );
										}
										setAttributes( {
											showSearchFields: newValue,
										} );
									} }
									__nextHasNoMarginBottom
								/>
							);
						} ) }

					{ !! taxonomies &&
						!! postTypes[ postType ].taxonomies &&
						taxonomies
							.filter( ( tax ) => {
								return postTypes[ postType ].taxonomies.includes( tax.slug );
							} )
							.map( ( i, index ) => {
								return (
									<ToggleControl
										key={ index }
										label={ i.labels.name }
										checked={ showTaxFilters.includes( i.slug ) ? true : false }
										onChange={ ( value ) => {
											let newValue = [ ...showTaxFilters ];
											if ( value && ! newValue.includes( i.slug ) ) {
												newValue.push( i.slug );
											} else if ( ! value && newValue.includes( i.slug ) ) {
												newValue = newValue.filter( function ( cat ) {
													return cat !== i.slug;
												} );
											}
											setAttributes( {
												showTaxFilters: newValue,
											} );
										} }
										__nextHasNoMarginBottom
									/>
								);
							} ) }
					<ToggleControl
						label="Show Sorts"
						checked={ showSorts }
						onChange={ ( value ) => {
							setAttributes( { showSorts: value } );
						} }
						__nextHasNoMarginBottom
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
						] }
						onChange={ ( value ) => {
							setAttributes( { listLayout: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
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

			<div { ...innerBlocksProps }>
				{ children }
				<div className="capitola-listings__results-header">
					<div className="capitola-listings__filters-count js-resultsCount">
						Showing #-# of # results
					</div>
					<div className="capitola-listings__filters">
						{ showSearchFields.map( ( slug ) => {
							return (
								<div key={ slug } className="capitola-listings__filters-filter">
									<label htmlFor={ slug }>
										{ postTypes[ postType ].searchParams[ slug ].label }
									</label>
									<div
										className={
											'capitola-listings__filters-input-wrap --' +
											postTypes[ postType ].searchParams[ slug ].type
										}
									>
										<input
											type={
												postTypes[ postType ].searchParams[ slug ].type ===
												'date'
													? 'date'
													: 'text'
											}
											name={ slug }
										/>
									</div>
								</div>
							);
						} ) }
						{ !! taxonomies &&
							taxonomies
								.filter( ( tax ) => {
									return showTaxFilters.includes( tax.slug );
								} )
								.map( ( tax ) => {
									return (
										<div
											key={ tax.slug }
											className="capitola-listings__filters-filter"
										>
											<label htmlFor={ tax.slug }>
												{ tax.labels.singular_name }
											</label>
											<div className="capitola-listings__filters-input-wrap --select">
												<select name={ tax.slug }>
													<option>All { tax.labels.name }</option>
												</select>
											</div>
										</div>
									);
								} ) }
						{ showSorts && (
							<div className="capitola-listings__filters-filter">
								<label htmlFor="orderby">Order</label>
								<div className="capitola-listings__filters-input-wrap --select">
									<select name="orderby">
										<option>{ orderbyOptions[ orderBy ].label }</option>
									</select>
								</div>
							</div>
						) }
					</div>
				</div>
				{ ! posts && <div className="--spinner" /> }
				{ !! posts && posts.length === 0 && 'No Posts Found' }
				{ !! posts && posts.length > 0 && (
					<div
						className={ `capitola-listings__list --${ listLayout }` }
						style={ { '--capitola-excerpt-lines': excerptLines } }
					>
						{ posts.map( ( i ) => {
							return (
								<div key={ i.id } className="capitola-result">
									{ postTile( attributes, layoutConditionals( attributes ), i ) }
								</div>
							);
						} ) }
					</div>
				) }
				<div className="capitola-page-nav">
					<button className="capitola-page-nav__button --prev" disabled="">
						Prev
					</button>
					<div className="capitola-page-nav__page-numbers">
						<span className="capitola-page-nav__button --number --current">1</span>
						<button
							className="capitola-page-nav__button --number"
							data-page="2"
							type="button"
						>
							2
						</button>
						<button
							className="capitola-page-nav__button --number"
							data-page="3"
							type="button"
						>
							3
						</button>
						<button
							className="capitola-page-nav__button --number"
							data-page="4"
							type="button"
						>
							4
						</button>
					</div>
					<button className="capitola-page-nav__button --next">Next</button>
				</div>
			</div>
		</div>
	);
}
