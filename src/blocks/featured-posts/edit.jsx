import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl, RadioControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	PostPicker,
	Repeater,
	repeaterOnChange,
} from '../../editor-controls';
import postTile from '../post-feed/postTile';
import postFeedTemplate from '../post-feed/postFeedTemplate';
import { postTypeOptions } from '../../scripts/modules/post-types';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		listLayout,
		showSlideCount,
		headlineTag,
		eyebrowTag,
		titleTag,
		ctaText,
		showExcerpt,
		titleLocation,
		showByline,
		postType,
		posts,
	} = attributes;

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

	return (
		<div { ...useBlockProps( { className: 'alignfull is-layout-constrained has-global-padding ' } ) }>
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
						__nextHasNoMarginBottom
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
										repeaterOnChange( attribute, 'post_id', value, index, props );
									} }
									postType={ postType }
								/>,
							];
						} }
					/>
				</PanelBody>
				<PanelBody title="H Tags" initialOpen={ false }>
					<TagSelect
						label="Eyebrow Tag"
						value={ eyebrowTag }
						onChange={ ( value ) => {
							setAttributes( { eyebrowTag: value } );
						} }
					/>
					<TagSelect
						label="Headline Tag"
						value={ headlineTag }
						onChange={ ( value ) => {
							setAttributes( { headlineTag: value } );
						} }
					/>
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
							onChange={ ( state ) => {
								setAttributes( { showSlideCount: state } );
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
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			{ postFeedTemplate( props, postObjects, postTile ) }
		</div>
	);
}
