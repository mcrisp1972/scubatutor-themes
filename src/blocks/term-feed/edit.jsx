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
import { getBlockType } from '@wordpress/blocks';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	TruncateControl,
} from '@capitola/editor-controls';
import TermTile from './term-tile';
import PostFeedTemplate from '@capitola/blocks/post-feed/post-feed-template';

export function Edit( props ) {
	const { name, attributes, setAttributes } = props;

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

	const defaultAttributes = useMemo( () => {
		return getBlockType( name ).attributes;
	}, [ name ] );

	const blockProps = useBlockProps( {
		className: `capitola-listings alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<ToolsPanel
					label="Query Options"
					resetAll={ () => {
						setAttributes( {
							taxonomy: defaultAttributes.taxonomy.default,
							limit: defaultAttributes.limit.default,
							orderBy: defaultAttributes.orderBy.default,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => {
							return defaultAttributes.taxonomy.default !== taxonomy;
						} }
						isShownByDefault={ true }
						label="Category"
						onDeselect={ () => {
							setAttributes( {
								taxonomy: defaultAttributes?.taxonomy,
							} );
						} }
					>
						<SelectControl
							label="Taxonomy"
							value={ taxonomy }
							options={ availableTaxonomies }
							onChange={ ( value ) => {
								setAttributes( { taxonomy: value } );
							} }
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return defaultAttributes.limit.default !== limit;
						} }
						label="Limit"
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								limit: defaultAttributes.limit.default,
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
							return defaultAttributes?.orderBy.default !== orderBy;
						} }
						label="Ordering"
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								orderBy: defaultAttributes?.orderBy.default,
							} );
						} }
					>
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
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<PostFeedTemplate props={ props } items={ terms } CardTemplate={ TermTile } />
		</div>
	);
}
