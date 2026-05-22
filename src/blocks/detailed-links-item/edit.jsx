import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	Spinner,
	Placeholder,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { link } from '../../editor-icons';
import { PostPicker, ImageSelect, PlaceholderImage } from '../../editor-controls';
import metadata from './block.json';

function BlockPlaceholder( { postType, postId, setAttributes, postTypeOptions } ) {
	return (
		<Placeholder label={ metadata.title } icon={ link } isColumnLayout={ true }>
			<SelectControl
				label="Linked Post Type"
				value={ postType }
				options={ postTypeOptions }
				onChange={ ( value ) => {
					setAttributes( {
						postType: value,
						postId: 0,
					} );
				} }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<PostPicker
				label="Linked Post"
				value={ postId }
				onChange={ ( value ) => {
					setAttributes( {
						postId: value,
					} );
				} }
				postType={ postType }
			/>
		</Placeholder>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;
	const { postType, postId, linkImage, linkTitle, linkExcerpt } = attributes;
	const postTypeOptions = applyFilters( 'capitola.postTypeOptions' );

	const linkObj = useSelect(
		( select ) => {
			return postId
				? select( 'core' ).getEntityRecord( 'postType', postType, postId )
				: undefined;
		},
		[ postType, postId ]
	);

	const blockProps = useBlockProps();

	const imageUrl = !! linkImage.source_url
		? linkImage.source_url
		: linkObj?.thumbnail_urls?.thumbnail;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Link Details" initialOpen={ true }>
					<SelectControl
						label="Linked Post Type"
						value={ postType }
						options={ postTypeOptions }
						onChange={ ( value ) => {
							setAttributes( {
								postType: value,
								postId: 0,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<PostPicker
						label="Linked Post"
						value={ postId }
						onChange={ ( value ) => {
							setAttributes( {
								postId: value,
							} );
						} }
						postType={ postType }
					/>
					{ context.showImage && (
						<ImageSelect
							label="Image Override"
							value={ linkImage.id }
							onChange={ ( value ) => {
								setAttributes( {
									linkImage: {
										id: value.id,
										source_url: value.url,
									},
								} );
							} }
						/>
					) }
					<TextControl
						label="Title Override"
						value={ linkTitle }
						onChange={ ( value ) => {
							setAttributes( {
								linkTitle: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					{ context.showExcerpt && (
						<TextareaControl
							label="Excerpt Override"
							value={ linkExcerpt }
							onChange={ ( value ) => {
								setAttributes( {
									linkExcerpt: value,
								} );
							} }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ ! postId ? (
				<BlockPlaceholder
					postType={ postType }
					postId={ postId }
					setAttributes={ setAttributes }
					postTypeOptions={ postTypeOptions }
				/>
			) : (
				<>
					{ context.showImage && (
						<div className="wp-block-capitola-detailed-links-item__image">
							{ ( () => {
								if ( imageUrl ) {
									return <img src={ imageUrl } alt="" />;
								} else if ( ! imageUrl && ( linkImage.id || !! linkObj ) ) {
									return <Spinner />;
								}
								return <PlaceholderImage />;
							} )() }
						</div>
					) }
					<div className="wp-block-capitola-detailed-links-item__body">
						<div className="wp-block-capitola-detailed-links-item__title --hl-s">
							{ !! linkTitle ? linkTitle : linkObj?.title.raw }
						</div>
						{ !! context.showExcerpt && (
							<p className="wp-block-capitola-detailed-links-item__excerpt">
								{ !! linkExcerpt ? linkExcerpt : linkObj?.excerpt.raw }
							</p>
						) }
					</div>
				</>
			) }
		</div>
	);
}
