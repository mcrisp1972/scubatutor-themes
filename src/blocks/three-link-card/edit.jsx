import { InspectorControls, useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { PanelBody, SelectControl, Spinner, ToolbarGroup } from '@wordpress/components';
import {
	PostPicker,
	PlaceholderImage,
	RadiusToolbar,
	ImageSelectButton,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const { postType, postId, image, title, imageRadius } = attributes;

	const postTypeOptions = applyFilters( 'capitola.postTypeOptions' );

	const linkObj = useSelect(
		( select ) => {
			return postId
				? select( 'core' ).getEntityRecord( 'postType', postType, postId )
				: undefined;
		},
		[ postType, postId ]
	);

	const renderedImage = !! image.source_url ? image.source_url : linkObj?.thumbnail_urls.large;

	const radiusClass = imageRadius ? ` --has-${ imageRadius }-radius` : '';

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Link Details" initialOpen={ true }>
					<SelectControl
						label="Link Post Type"
						value={ postType }
						options={ postTypeOptions }
						onChange={ ( value ) => {
							setAttributes( {
								postType: value,
								postId: 0,
							} );
						} }
						__next40pxDefaultSize
					/>
					<PostPicker
						label="Link"
						value={ postId }
						onChange={ ( value ) => {
							setAttributes( {
								postId: value,
							} );
						} }
						postType={ postType }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<RadiusToolbar props={ props } attribute="imageRadius" />
				</ToolbarGroup>
			</BlockControls>
			<div className={ `wp-block-capitola-three-link-card__image  ${ radiusClass }` }>
				{ ( () => {
					if ( !! renderedImage ) {
						return (
							<>
								<img src={ renderedImage } alt="" />
								{ isSelected && (
									<ImageSelectButton
										onSelect={ ( value ) => {
											setAttributes( {
												image: {
													id: value.id,
													source_url: value.url,
												},
											} );
										} }
										value={ image.id }
										flexWrap={ true }
									/>
								) }
							</>
						);
					} else if ( ! linkObj && postId ) {
						return (
							<Spinner
								style={ {
									width: '33%',
									height: '33%',
									margin: 0,
								} }
							/>
						);
					}
					return (
						<>
							<PlaceholderImage hasBgColor={ false } />
							{ isSelected && (
								<ImageSelectButton
									onSelect={ ( value ) => {
										setAttributes( {
											image: {
												id: value.id,
												url: value.url,
											},
										} );
									} }
									value={ image.id }
									flexWrap={ true }
								/>
							) }
						</>
					);
				} )() }
			</div>
			<RichText
				className="wp-block-capitola-three-link-card__title --hl-s"
				value={ title }
				allowedFormats={ [] }
				placeholder={ linkObj?.title.raw || 'Title...' }
				onChange={ ( value ) => {
					return setAttributes( { title: value } );
				} }
			/>
		</div>
	);
}
