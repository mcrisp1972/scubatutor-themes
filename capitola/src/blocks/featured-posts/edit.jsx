/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RadioControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	PostPicker,
	Repeater,
	repeaterOnChange,
} from '@capitola/editor-controls';
import PostTile from '@capitola/blocks/post-feed/post-tile';
import PostFeedTemplate from '@capitola/blocks/post-feed/post-feed-template';

export function Edit( props ) {
	const { attributes, setAttributes, name } = props;

	const {
		listLayout,
		showSlideCount,
		titleTag,
		ctaText,
		showExcerpt,
		titleLocation,
		showByline,
		postType,
		posts,
	} = attributes;

	const postTypeOptions = applyFilters( 'capitola.postTypeOptions' );

	const postObjects = useSelect(
		( select ) => {
			return posts.length
				? select( 'core' ).getEntityRecords( 'postType', postType, {
						include: posts.map( ( post ) => {
							return post.post_id;
						} ),
						per_page: -1,
						orderby: 'include',
				  } )
				: [];
		},
		[ postType, posts ]
	);
	const blockProps = useBlockProps( {
		className: 'capitola-listings alignfull is-layout-constrained has-global-padding ',
	} );

	const defaultAttributes = getBlockType( name ).attributes;

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Query Options" initialOpen={ true }>
					<SelectControl
						label="Post Type"
						value={ postType }
						options={ postTypeOptions }
						onChange={ ( value ) => {
							return setAttributes( {
								postType: value,
							} );
						} }
						__next40pxDefaultSize
					/>
					<Repeater
						props={ props }
						attribute="posts"
						label="Post"
						pluralLabel="Posts"
						newObject={ {
							post_id: 0,
						} }
						fields={ ( index ) => {
							const attribute = 'posts';
							return [
								<PostPicker
									key={ index }
									label="Post"
									value={ props.attributes.posts[ index ].post_id }
									onChange={ ( value ) => {
										repeaterOnChange(
											attribute,
											'post_id',
											value,
											index,
											props
										);
									} }
									postType={ postType }
								/>,
							];
						} }
					/>
				</PanelBody>
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
							onChange={ ( state ) => {
								setAttributes( { showSlideCount: state } );
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
							help="Byline is only displayed for blog posts."
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<PostFeedTemplate
				props={ props }
				items={ postObjects }
				CardTemplate={ PostTile }
				noResultsMsg="No posts selected. The block will not be displayed."
			/>
		</div>
	);
}
