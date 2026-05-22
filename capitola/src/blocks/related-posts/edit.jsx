import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RadioControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { TagSelect, ColorThemePanel, AnimationPanel, TruncateControl } from '../../editor-controls';
import { applyFilters } from '@wordpress/hooks';
import postTile from '../post-feed/post-tile';
import PostFeedTemplate from '../post-feed/post-feed-template';
import { templatePostType } from '../../scripts/modules/template-post-type';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		colorTheme,
		listLayout,
		showSlideCount,
		headlineTag,
		eyebrowTag,
		titleTag,
		ctaText,
		showExcerpt,
		excerptLines,
		titleLocation,
		showByline,
		limit,
		postsTypeQueryArgs,
		isExample,
	} = attributes;

	const isTemplate = useSelect( ( select ) => {
		return select( 'core/edit-site' ) !== undefined;
	}, [] );

	const postTypeCats = applyFilters( 'capitola.postTypeCats' );

	const postType = useSelect(
		( select ) => {
			if ( isTemplate ) {
				return templatePostType( select( 'core/editor' ).getCurrentPostId() );
			}
			const type = select( 'core/editor' ).getCurrentPostType();
			return !! type ? type : 'post';
		},
		[ isTemplate ]
	);

	const postID = useSelect( ( select ) => {
		return isTemplate ? 0 : select( 'core/editor' ).getCurrentPostId();
	} );

	const taxonomy = !! postType ? postTypeCats[ postType ] : 'category';

	const relatedCat = useSelect(
		( select ) => {
			return select( 'core/editor' ).getEditedPostAttribute( taxonomy );
		},
		[ taxonomy ]
	);

	const pageParent = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'parent' );
	} );

	const pageID = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'id' );
	} );

	const relatedPosts = useSelect(
		( select ) => {
			let args = {};

			if ( postType === 'page' ) {
				args = {
					exclude: [ postID ],
					per_page: limit,
					order: 'asc',
					orderby: 'menu_order',
				};

				if ( ! isExample ) {
					args.parent = pageParent ? [ pageParent ] : [ pageID ];
				}
			} else {
				args = {
					exclude: postID !== null ? [ postID ] : [],
					per_page: limit,
				};

				if ( ! isExample ) {
					args[ taxonomy ] = relatedCat;
				}

				if ( postType === 'post' ) {
					args.orderby = 'date';
					args.order = 'desc';
				}

				if ( !! postsTypeQueryArgs?.[ postType ] ) {
					args = { ...args, ...postsTypeQueryArgs?.[ postType ] };
				}
			}

			return select( 'core' ).getEntityRecords( 'postType', postType, args );
		},
		[
			isExample,
			limit,
			pageID,
			pageParent,
			postID,
			postType,
			postsTypeQueryArgs,
			relatedCat,
			taxonomy,
		]
	);
	const blockProps = useBlockProps( {
		className: `capitola-listings alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Query Options" initialOpen={ true }>
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
							help="Byline is only displayed for blog posts."
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			{ PostFeedTemplate(
				{ ...props, attributes: { ...attributes, postType } },
				relatedPosts,
				postTile
			) }
		</div>
	);
}
