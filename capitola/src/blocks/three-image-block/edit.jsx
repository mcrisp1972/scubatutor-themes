import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import {
	PanelBody,
	RadioControl,
	RangeControl,
	ToolbarGroup,
	ResizableBox,
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
	const { attributes, setAttributes, toggleSelection } = props;

	const {
		introAlign,
		mediaWidth,
		gridAspectRatio,
		rearImagePosition,
		rearImage,
		middleImage,
		frontImage,
		rearImageCropPosition,
		middleImageCropPosition,
		frontImageCropPosition,
		rearImageRadius,
		middleImageRadius,
		frontImageRadius,
		rearImageHeight,
		middleImageHeight,
		middleImageTopPos,
		middleImageLeftPos,
		frontImageHeight,
		rearImageWidth,
		middleImageWidth,
		frontImageWidth,
		verticalAlign,
		colorTheme,
	} = attributes;

	const isMobile = useViewportMatch( 'medium', '<' );

	const [ tempWidth, setTempWidth ] = useState( null );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-three-image-block__width alignwide --has-${ introAlign }-intro ${
				verticalAlign === 'top' ? ' --align-top' : ''
			}`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
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
				</PanelBody>
				<PanelBody title="Middle Image" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ middleImage.id }
						onChange={ ( value ) => {
							setAttributes( {
								middleImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					<RadioControl
						label="Radius"
						selected={ middleImageRadius }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						] }
						onChange={ ( value ) => {
							return setAttributes( {
								middleImageRadius: value,
							} );
						} }
					/>
					<RangeControl
						label="Top Position"
						value={ middleImageTopPos }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( {
								middleImageTopPos: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Left Position"
						value={ middleImageLeftPos }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( {
								middleImageLeftPos: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Height"
						value={ middleImageHeight }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( {
								middleImageHeight: value,
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label="Width"
						value={ middleImageWidth }
						withInputField={ false }
						min={ 1 }
						max={ 20 }
						step={ 1 }
						onChange={ ( value ) => {
							return setAttributes( { middleImageWidth: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ImageAlignMatrix
						label="Image Crop Position"
						value={ middleImageCropPosition }
						onChange={ ( value ) => {
							setAttributes( { middleImageCropPosition: value } );
						} }
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
				</PanelBody>
				<PanelBody title="Block Settings" initialOpen={ true }>
					<RangeControl
						label="Media Width (%)"
						value={ tempWidth || mediaWidth }
						onChange={ ( value ) => {
							setAttributes( { mediaWidth: value } );
						} }
						min={ 20 }
						max={ 50 }
						__next40pxDefaultSize
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
					<VerticalAlignToolbar props={ props } attribute="verticalAlign" />
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
				<ResizableBox
					className={ `wp-block-capitola-three-image-block__imagecol --aspect-ratio-${ gridAspectRatio } --rear-position-${ rearImagePosition }` }
					size={ {
						width: isMobile ? '100%' : mediaWidth + '%',
					} }
					style={ {
						flexBasis: 'unset',
						'--capitola-flex-basis': mediaWidth + '%',
					} }
					minWidth="20%"
					maxWidth={ isMobile ? '100%' : '50%' }
					enable={ {
						top: false,
						bottom: false,
						left: introAlign === 'left' && ! isMobile ? true : false,
						right: introAlign === 'right' && ! isMobile ? true : false,
					} }
					onResize={ ( event, direction, elt ) => {
						setTempWidth( parseInt( elt.style.width ) );
					} }
					onResizeStop={ ( event, direction, elt ) => {
						setAttributes( {
							mediaWidth: parseInt( elt.style.width ),
						} );
						setTempWidth( null );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					<figure
						className={ `wp-block-capitola-three-image-block__rear-image ${
							rearImageRadius ? ' --has-' + rearImageRadius + '-radius' : ''
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
					</figure>
					<figure
						className={ `wp-block-capitola-three-image-block__middle-image ${
							middleImageRadius ? ' --has-' + middleImageRadius + '-radius' : ''
						}` }
						style={ {
							'--image-top-pos': middleImageTopPos,
							'--image-left-pos': middleImageLeftPos,
							'--image-height': middleImageHeight,
							'--image-width': middleImageWidth,
							'--capitola-objectPosition': middleImageCropPosition,
						} }
					>
						{ middleImage?.source_url ? (
							<img src={ middleImage?.source_url } alt="" />
						) : (
							<PlaceholderImage />
						) }
					</figure>
					<figure
						className={ `wp-block-capitola-three-image-block__front-image ${
							frontImageRadius ? ' --has-' + frontImageRadius + '-radius' : ''
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
					</figure>
				</ResizableBox>
			</div>
		</div>
	);
}
