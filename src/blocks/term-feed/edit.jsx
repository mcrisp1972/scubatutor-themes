import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RadioControl, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { TagSelect, ColorThemePanel, AnimationPanel, TruncateControl } from '../../editor-controls';
import termTile from './termTile';
import postFeedTemplate from '../post-feed/postFeedTemplate';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		listLayout,
		showSlideCount,
		orderBy,
		titleTag,
		ctaText,
		showExcerpt,
		excerptLines,
		titleLocation,
		taxonomy,
		limit,
		colorTheme,
		availableTaxonomies,
	} = attributes;

	const terms = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, {
				per_page: limit,
				orderby: orderBy,
				order: orderBy === 'count' ? 'desc' : 'asc',
				hide_empty: true,
				parent: 0,
			} );
		},
		[ limit, orderBy, taxonomy ]
	);

	return (
		<div
			{ ...useBlockProps( {
				className: `capitola-listings alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="settings">
				<PanelBody title="Query Options" initialOpen={ true }>
					<SelectControl
						label="Taxonomy"
						value={ taxonomy }
						options={ availableTaxonomies }
						onChange={ ( value ) => {
							setAttributes( { taxonomy: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
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
						options={ [
							{ label: 'Name', value: 'name' },
							{ label: 'Number of Posts', value: 'count' },
						] }
						onChange={ ( value ) => {
							setAttributes( { orderBy: value } );
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
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			{ postFeedTemplate( props, terms, termTile ) }
		</div>
	);
}
