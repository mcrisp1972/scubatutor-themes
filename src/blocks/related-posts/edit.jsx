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
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import {
	TagSelect,
	ColorThemePanel,
	AnimationPanel,
	TruncateControl,
} from '@capitola/editor-controls';
import { applyFilters } from '@wordpress/hooks';
import PostTile from '@capitola/blocks/post-feed/post-tile';
import { listingLayouts } from '@capitola/blocks/post-feed/listing-layouts';
import PostFeedTemplate from '@capitola/blocks/post-feed/post-feed-template';
import { templatePostType } from '@capitola/scripts/modules/template-post-type';

export function Edit( props ) {
	const { attributes, setAttributes, name } = props;

	const {
		colorTheme,
		listLayout,
		showSlideCount,
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

	const defaultAttributes = getBlockType( name ).attributes;

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
				<ToolsPanel
					label="Query Options"
					resetAll={ () => {
						setAttributes( {
							limit: defaultAttributes.limit.default,
						} );
					} }
				>
					<ToolsPanelItem
						label="Limit"
						hasValue={ () => {
							return limit !== defaultAttributes.limit.default;
						} }
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
						options={ listingLayouts }
						onChange={ ( value ) => {
							setAttributes( { listLayout: value } );
						} }
					/>
					{ listLayout === 'slider' && (
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
							help="Byline is only displayed for blog posts."
						/>
					) }
				</PanelBody>
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<PostFeedTemplate
				props={ { ...props, attributes: { ...attributes, postType } } }
				items={ relatedPosts }
				CardTemplate={ PostTile }
			/>
		</div>
	);
}
