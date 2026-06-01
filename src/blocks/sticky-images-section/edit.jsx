import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextareaControl } from '@wordpress/components';
import { ImageFocalPoint, ImageSelectButton } from '../../editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, isSelected, context } = props;
	const { sideImage, imageFocalPoint, showCaption, captionOverride } = attributes;
	const { showFullImage } = context;

	const blockProps = useBlockProps( {
		className: 'wp-block-capitola-sticky-images__body-section',
	} );
	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		template: [ [ 'capitola/body-text' ] ],
		templateLock: 'all',
	} );

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
						/>
					) }
					{ ! showFullImage && !! sideImage?.source_url && (
						<ImageFocalPoint
							image={ sideImage?.source_url }
							value={ imageFocalPoint }
							onChange={ ( value ) => {
								setAttributes( { imageFocalPoint: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div
				className="wp-block-capitola-sticky-images__mobile-imageratio"
				style={ { '--capitola-objectPosition': imageFocalPoint } }
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
