import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	RadioControl,
	RangeControl,
	ToggleControl,
	ToolbarGroup,
} from '@wordpress/components';
import {
	ImageSelect,
	ImageAlignMatrix,
	ColorThemePanel,
	AnimationPanel,
	PlaceholderImage,
	VerticalAlignToolbar,
	IntroAlignToolbar,
	AspectRatioToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		introAlign,
		gridAspectRatio,
		rearImagePosition,
		rearImage,
		rearImageHeight,
		rearImageWidth,
		rearImageCropPosition,
		rearImageRadius,
		rearImageShowCaption,
		rearImageCaption,
		frontImage,
		frontImageHeight,
		frontImageWidth,
		frontImageCropPosition,
		frontImageRadius,
		frontImageShowCaption,
		frontImageCaption,
		verticalAlign,
		colorTheme,
	} = attributes;

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-two-image-block__width alignwide --has-${ introAlign }-intro ${
				verticalAlign === 'top' ? ' --align-top' : ''
			}`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	const rearImageObj = useSelect(
		( select ) => {
			return rearImage.id
				? select( 'core' ).getMedia( rearImage.id )
				: null;
		},
		[ rearImage.id ]
	);

	const frontImageObj = useSelect(
		( select ) => {
			return frontImage.id
				? select( 'core' ).getMedia( frontImage.id )
				: null;
		},
		[ frontImage.id ]
	);

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="settings">
				<PanelBody title="Rear Image" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ rearImage.id }
						onChange={ ( value ) => {
							setAttributes( {
								rearImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					<RadioControl
						label="Radius"
						selected={ rearImageRadius }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						] }
						onChange={ ( value ) => {
							return setAttributes( { rearImageRadius: value } );
						} }
					/>
					<RangeControl
						label="Height"
						value={ rearImageHeight }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( { rearImageHeight: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Width"
						value={ rearImageWidth }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( { rearImageWidth: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ImageAlignMatrix
						label="Image Crop Position"
						value={ rearImageCropPosition }
						onChange={ ( value ) => {
							setAttributes( { rearImageCropPosition: value } );
						} }
					/>
					<RadioControl
						label="Image Position"
						selected={ rearImagePosition }
						options={ [
							{ label: 'Top Left', value: 'top-left' },
							{ label: 'Top Right', value: 'top-right' },
							{ label: 'Bottom Left', value: 'bottom-left' },
							{ label: 'Bottom Right', value: 'bottom-right' },
						] }
						onChange={ ( value ) => {
							return setAttributes( {
								rearImagePosition: value,
							} );
						} }
					/>
					<ToggleControl
						label="Show Caption"
						checked={ rearImageShowCaption }
						onChange={ ( value ) => {
							setAttributes( { rearImageShowCaption: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Front Image" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ frontImage.id }
						onChange={ ( value ) => {
							setAttributes( {
								frontImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					<RadioControl
						label="Radius"
						selected={ frontImageRadius }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						] }
						onChange={ ( value ) => {
							return setAttributes( { frontImageRadius: value } );
						} }
					/>
					<RangeControl
						label="Height"
						value={ frontImageHeight }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( { frontImageHeight: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Width"
						value={ frontImageWidth }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( { frontImageWidth: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ImageAlignMatrix
						label="Image Crop Position"
						value={ frontImageCropPosition }
						onChange={ ( value ) => {
							setAttributes( { frontImageCropPosition: value } );
						} }
					/>
					<RadioControl
						label="Image Position"
						selected={ rearImagePosition }
						options={ [
							{ label: 'Top Right', value: 'bottom-left' },
							{ label: 'Top Left', value: 'bottom-right' },
							{ label: 'Bottom Right', value: 'top-left' },
							{ label: 'Bottom Left', value: 'top-right' },
						] }
						onChange={ ( value ) => {
							return setAttributes( {
								rearImagePosition: value,
							} );
						} }
					/>
					<ToggleControl
						label="Show Caption"
						checked={ frontImageShowCaption }
						onChange={ ( value ) => {
							setAttributes( { frontImageShowCaption: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } allowFigureReveal={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left' ] }
					/>
					<VerticalAlignToolbar
						props={ props }
						attribute="verticalAlign"
					/>
					<AspectRatioToolbar
						props={ props }
						attribute="gridAspectRatio"
						options={ [ '16-9', '3-2', '4-3', '1' ] }
						label="Change image grid aspect ratio"
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps }>
				{ children }
				<div
					className={ `wp-block-capitola-two-image-block__imagecol --aspect-ratio-${ gridAspectRatio } --rear-position-${ rearImagePosition }` }
				>
					<figure
						className={ `wp-block-capitola-two-image-block__rear-image ${
							rearImageRadius
								? ' --has-' + rearImageRadius + '-radius'
								: ''
						}` }
						style={ {
							'--image-height': rearImageHeight,
							'--image-width': rearImageWidth,
							'--capitola-objectPosition': rearImageCropPosition,
						} }
					>
						{ rearImage?.source_url ? (
							<img src={ rearImage?.source_url } alt="" />
						) : (
							<PlaceholderImage />
						) }
						{ rearImageShowCaption && (
							<RichText
								tagName="figcaption"
								value={ rearImageCaption }
								placeholder={
									rearImageObj?.caption?.raw
										? rearImageObj.caption.raw
										: 'Caption...'
								}
								allowedFormats={ [] }
								onChange={ ( value ) => {
									setAttributes( {
										rearImageCaption: value,
									} );
								} }
							/>
						) }
					</figure>
					<figure
						className={ `wp-block-capitola-two-image-block__front-image ${
							frontImageRadius
								? ' --has-' + frontImageRadius + '-radius'
								: ''
						}` }
						style={ {
							'--image-height': frontImageHeight,
							'--image-width': frontImageWidth,
							'--capitola-objectPosition': frontImageCropPosition,
						} }
					>
						{ frontImage?.source_url ? (
							<img src={ frontImage.source_url } alt="" />
						) : (
							<PlaceholderImage />
						) }
						{ frontImageShowCaption && (
							<RichText
								tagName="figcaption"
								value={ frontImageCaption }
								placeholder={
									frontImageObj?.caption?.raw
										? frontImageObj.caption.raw
										: 'Caption...'
								}
								allowedFormats={ [] }
								onChange={ ( value ) => {
									setAttributes( {
										frontImageCaption: value,
									} );
								} }
							/>
						) }
					</figure>
				</div>
			</div>
		</div>
	);
}
