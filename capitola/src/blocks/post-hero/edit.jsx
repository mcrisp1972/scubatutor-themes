import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { date } from '@wordpress/date';
import { PanelBody, ToggleControl, RadioControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { TagSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		headline,
		headlineTag,
		showSocials,
		showByline,
		showFeaturedImage,
		imageLocation,
		featuredImage,
	} = attributes;

	const isTemplate = useSelect( ( select ) => {
		return select( 'core/edit-site' ) !== undefined;
	}, [] );

	const [ socials, setSocials ] = useState( null );

	const postAuthor = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'author' );
	}, [] );

	const postTitle = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'title' );
	}, [] );

	const postType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	const postObject = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPost();
	}, [] );

	const authorObject = useSelect(
		( select ) => {
			return ! isTemplate ? select( 'core' ).getUser( postAuthor ) : { name: 'Author Name' };
		},
		[ isTemplate, postAuthor ]
	);

	const authorImage = useSelect(
		( select ) => {
			if (
				! isTemplate &&
				authorObject &&
				showByline &&
				authorObject.meta.userProfilePhoto
			) {
				return select( 'core' ).getEntityRecord(
					'postType',
					'attachment',
					authorObject.meta.userProfilePhoto
				);
			} else if ( isTemplate ) {
				return {
					source_url: 'https://pd.w.org/2023/08/90464e6cdeeed8d02.58104016-1536x1024.jpg',
				};
			}
			return undefined;
		},
		[ isTemplate, authorObject, showByline ]
	);

	const imageObject = useSelect(
		( select ) => {
			if ( isTemplate ) {
				return {
					source_url: 'https://pd.w.org/2023/08/90464e6cdeeed8d02.58104016-1536x1024.jpg',
				};
			}
			if ( typeof featuredImage === 'object' ) {
				return featuredImage;
			}
			const imageId = featuredImage
				? featuredImage
				: select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );

			return imageId
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId )
				: undefined;
		},
		[ isTemplate, featuredImage ]
	);
	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			setSocials( result.capitola_social_shares );
		} );
	}, [] );
	const blockProps = useBlockProps( {
		className: 'alignwide' + ( imageLocation === 'bottom' ? ' --bottom-image' : '' ),
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<ToggleControl
						label="Show Featured Image"
						checked={ showFeaturedImage }
						onChange={ ( value ) => {
							setAttributes( { showFeaturedImage: value } );
						} }
					/>
					{ showFeaturedImage && (
						<RadioControl
							label="Image Location"
							selected={ imageLocation }
							options={ [
								{ label: 'Above Title', value: 'top' },
								{ label: 'Below Title', value: 'bottom' },
							] }
							onChange={ ( value ) => {
								setAttributes( { imageLocation: value } );
							} }
						></RadioControl>
					) }
					<ToggleControl
						label="Show Byline"
						checked={ showByline }
						onChange={ ( value ) => {
							setAttributes( { showByline: value } );
						} }
					/>
					<ToggleControl
						label="Show Social Shares"
						checked={ showSocials }
						onChange={ ( value ) => {
							setAttributes( { showSocials: value } );
						} }
					/>
				</PanelBody>
				<PanelBody title="Markup" initialOpen={ true }>
					<TagSelect
						label="Headline Tag"
						value={ headlineTag }
						onChange={ ( value ) => {
							setAttributes( { headlineTag: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ showFeaturedImage && (
				<div className="wp-block-capitola-post-hero__hero">
					<div className="wp-block-capitola-post-hero__image">
						{ imageObject !== undefined && (
							<img src={ imageObject.source_url } alt="" />
						) }
					</div>
				</div>
			) }
			{ isTemplate && (
				<div className="wp-block-capitola-post-hero__title --hl-xl">Post Title</div>
			) }
			{ ! isTemplate && (
				<RichText
					className="wp-block-capitola-post-hero__title --hl-xxl"
					placeholder={ postTitle ? postTitle : 'Headline...' }
					value={ headline }
					onChange={ ( value ) => {
						setAttributes( { headline: value } );
					} }
				/>
			) }
			<div className="wp-block-capitola-post-hero__details">
				<div className="wp-block-capitola-post-hero__byline">
					{ ( isTemplate || postType === 'post' ) && showByline && (
						<>
							<div className="wp-block-capitola-post-hero__byline-img-wrap">
								{ authorImage !== undefined && (
									<img src={ authorImage.source_url } alt="" />
								) }
							</div>
							<div className="wp-block-capitola-post-hero__byline-date">
								<div>{ !! authorObject ? authorObject.name : '' }</div>
								<div>
									{ ! isTemplate
										? date( "M jS 'y", postObject.date )
										: 'Publish Date' }
								</div>
							</div>
						</>
					) }
				</div>
				{ showSocials && !! socials && (
					<div className="wp-block-capitola-post-hero__social-links">
						{ Object.keys( socials ).map( ( key ) => {
							if ( socials[ key ] === 1 ) {
								return (
									<div
										key={ key }
										className={ `wp-block-capitola-post-hero__social-link --${ key }` }
									></div>
								);
							}
							return null;
						} ) }
					</div>
				) }
			</div>
		</div>
	);
}
