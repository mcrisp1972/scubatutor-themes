import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextareaControl,
} from '@wordpress/components';
import { ImageAlignMatrix, ImageSelectButton } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected, context } = props;

	const { sideImage, imageCropPosition, showCaption, captionOverride } =
		attributes;

	const { showFullImage } = context;

	const { showFullImage } = context;

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		useBlockProps( {
			className: 'wp-block-capitola-sticky-images__body-section',
		} ),
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...innerBlocksProps }>
			<InspectorControls>
				<PanelBody title="Image Settings" initialOpen={ true }>
					<ToggleControl
						label="Show Caption"
						checked={ showCaption }
						onChange={ ( value ) => {
							setAttributes( { showCaption: value } );
						} }
						__nextHasNoMarginBottom
					/>
					{ showCaption && (
						<TextareaControl
							label="Caption Override"
							value={ captionOverride }
							onChange={ ( value ) => {
								setAttributes( {
									captionOverride: value,
								} );
							} }
							__nextHasNoMarginBottom
						/>
					) }
					{ ! showFullImage && (
						<ImageAlignMatrix
							label="Image Crop Position"
							value={ imageCropPosition }
							onChange={ ( value ) => {
								setAttributes( { imageCropPosition: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div
				className="wp-block-capitola-sticky-images__mobile-imageratio"
				style={ { '--capitola-objectPosition': imageCropPosition } }
			>
				{ sideImage.source_url ? (
					<>
						<img src={ sideImage.source_url } alt="" />
						{ isSelected && (
							<ImageSelectButton
								onSelect={ ( value ) => {
									setAttributes( {
										sideImage: {
											id: value.id,
											source_url: value.url,
										},
									} );
								} }
								value={ sideImage.id }
							/>
						) }
					</>
				) : (
					<MediaPlaceholder
						onSelect={ ( value ) => {
							setAttributes( {
								sideImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
						value={ sideImage.id }
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						style={ { height: '100%', borderRadius: '6px' } }
					/>
				) }
			</div>
			{ children }
		</div>
	);
}
