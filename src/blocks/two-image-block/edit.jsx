/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { getBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	RadioControl,
	RangeControl,
	ToggleControl,
	ToolbarGroup,
	ResizableBox,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import {
	ImageSelect,
	ImageFocalPoint,
	ColorThemePanel,
	AnimationPanel,
	PlaceholderImage,
	VerticalAlignToolbar,
	IntroAlignToolbar,
	AspectRatioToolbar,
	animationPreviewClass,
} from '@capitola/editor-controls';

function ImageCard( {
	className,
	image,
	focalPoint,
	height,
	width,
	radius,
	showCaption,
	caption,
	captionPlaceholder,
	onCaptionChange,
} ) {
	return (
		<figure
			className={ `${ className } ${ radius ? ` --has-${ radius }-radius` : '' }` }
			style={ {
				'--image-height': height,
				'--image-width': width,
				'--capitola-objectPosition': focalPoint,
			} }
		>
			{ image?.source_url ? <img src={ image?.source_url } alt="" /> : <PlaceholderImage /> }
			{ showCaption && (
				<RichText
					tagName="figcaption"
					value={ caption }
					placeholder={ captionPlaceholder || 'Caption...' }
					allowedFormats={ [] }
					onChange={ onCaptionChange }
				/>
			) }
		</figure>
	);
}

export function Edit( props ) {
	const { attributes, setAttributes, name, toggleSelection } = props;

	const {
		introAlign,
		gridAspectRatio,
		mediaWidth,
		rearImagePosition,
		rearImage,
		rearImageHeight,
		rearImageWidth,
		rearImageFocalPoint,
		rearImageRadius,
		rearImageShowCaption,
		rearImageCaption,
		frontImage,
		frontImageHeight,
		frontImageWidth,
		frontImageFocalPoint,
		frontImageRadius,
		frontImageShowCaption,
		frontImageCaption,
		verticalAlign,
		colorTheme,
		revealAnimation,
	} = attributes;

	const isMobile = useViewportMatch( 'medium', '<' );

	const [ tempWidth, setTempWidth ] = useState( null );

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-two-image-block__width alignwide --has-${ introAlign }-intro ${
				verticalAlign === 'top' ? ' --align-top' : ''
			} ${ animationPreviewClass( revealAnimation, 'block' ) }`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	const rearImageObj = useSelect(
		( select ) => {
			return rearImage.id
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', rearImage.id )
				: null;
		},
		[ rearImage.id ]
	);

	const frontImageObj = useSelect(
		( select ) => {
			return frontImage.id
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', frontImage.id )
				: null;
		},
		[ frontImage.id ]
	);

	const defaultAttributes = getBlockType( name ).attributes;

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
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
					/>
				</PanelBody>
				<ToolsPanel
					label="Rear Image"
					resetAll={ () => {
						setAttributes( {
							rearImage: defaultAttributes?.rearImage.default,
							rearImageRadius: defaultAttributes?.rearImageRadius.default,
							rearImageHeight: defaultAttributes?.rearImageHeight.default,
							rearImageWidth: defaultAttributes?.rearImageWidth.default,
							rearImageFocalPoint: defaultAttributes?.rearImageFocalPoint.default,
							rearImagePosition: defaultAttributes?.rearImagePosition.default,
							rearImageShowCaption: defaultAttributes?.rearImageShowCaption.default,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => {
							return rearImage.id;
						} }
						isShownByDefault={ true }
						label="Image"
						onDeselect={ () => {
							setAttributes( {
								rearImage: defaultAttributes?.rearImage.default,
							} );
						} }
					>
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
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return rearImageRadius !== defaultAttributes?.rearImageRadius.default;
						} }
						label="Radius"
						onDeselect={ () => {
							setAttributes( {
								rearImageRadius: defaultAttributes?.rearImageRadius.default,
							} );
						} }
					>
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
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return rearImageHeight !== defaultAttributes?.rearImageHeight.default;
						} }
						label="Height"
						onDeselect={ () => {
							setAttributes( {
								rearImageHeight: defaultAttributes?.rearImageHeight.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return rearImageWidth !== defaultAttributes?.rearImageWidth.default;
						} }
						label="Width"
						onDeselect={ () => {
							setAttributes( {
								rearImageWidth: defaultAttributes?.rearImageWidth.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								rearImageFocalPoint !==
								defaultAttributes?.rearImageFocalPoint.default
							);
						} }
						label="Focal Point"
						onDeselect={ () => {
							setAttributes( {
								rearImageFocalPoint: defaultAttributes?.rearImageFocalPoint.default,
							} );
						} }
					>
						{ rearImage.source_url && (
							<ImageFocalPoint
								image={ rearImage.source_url }
								value={ rearImageFocalPoint }
								onChange={ ( value ) => {
									setAttributes( { rearImageFocalPoint: value } );
								} }
							/>
						) }
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								rearImagePosition !== defaultAttributes?.rearImagePosition.default
							);
						} }
						isShownByDefault={ true }
						label="Image Position"
						onDeselect={ () => {
							setAttributes( {
								rearImagePosition: defaultAttributes?.rearImagePosition.default,
							} );
						} }
					>
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
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								rearImageShowCaption !==
								defaultAttributes?.rearImageShowCaption.default
							);
						} }
						label="Show Caption"
						onDeselect={ () => {
							setAttributes( {
								rearImageShowCaption:
									defaultAttributes?.rearImageShowCaption.default,
							} );
						} }
					>
						<ToggleControl
							label="Show Caption"
							checked={ rearImageShowCaption }
							onChange={ ( value ) => {
								setAttributes( { rearImageShowCaption: value } );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
				<ToolsPanel
					label="Front Image"
					resetAll={ () => {
						setAttributes( {
							frontImage: defaultAttributes?.frontImage.default,
							frontImageRadius: defaultAttributes?.frontImageRadius.default,
							frontImageHeight: defaultAttributes?.frontImageHeight.default,
							frontImageWidth: defaultAttributes?.frontImageWidth.default,
							frontImageFocalPoint: defaultAttributes?.frontImageFocalPoint.default,
							frontImageShowCaption: defaultAttributes?.frontImageShowCaption.default,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => {
							return frontImage.id;
						} }
						isShownByDefault={ true }
						label="Image"
						onDeselect={ () => {
							setAttributes( {
								frontImage: defaultAttributes?.frontImage.default,
							} );
						} }
					>
						<ImageSelect
							label="Image"
							value={ frontImage.id }
							onChange={ ( value ) => {
								setAttributes( {
									rearImage: {
										id: value.id,
										source_url: value.url,
									},
								} );
							} }
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return frontImageRadius !== defaultAttributes?.frontImageRadius.default;
						} }
						label="Radius"
						onDeselect={ () => {
							setAttributes( {
								frontImageRadius: defaultAttributes?.frontImageRadius.default,
							} );
						} }
					>
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
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return frontImageHeight !== defaultAttributes?.frontImageHeight.default;
						} }
						label="Height"
						onDeselect={ () => {
							setAttributes( {
								frontImageHeight: defaultAttributes?.frontImageHeight.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return frontImageWidth !== defaultAttributes?.frontImageWidth.default;
						} }
						label="Width"
						onDeselect={ () => {
							setAttributes( {
								frontImageWidth: defaultAttributes?.frontImageWidth.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								frontImageFocalPoint !==
								defaultAttributes?.frontImageFocalPoint.default
							);
						} }
						label="Focal Point"
						onDeselect={ () => {
							setAttributes( {
								frontImageFocalPoint:
									defaultAttributes?.frontImageFocalPoint.default,
							} );
						} }
					>
						{ frontImage.source_url && (
							<ImageFocalPoint
								image={ frontImage.source_url }
								value={ frontImageFocalPoint }
								onChange={ ( value ) => {
									setAttributes( { frontImageFocalPoint: value } );
								} }
							/>
						) }
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								frontImageShowCaption !==
								defaultAttributes?.rearImageShowCaption.default
							);
						} }
						label="Show Caption"
						onDeselect={ () => {
							setAttributes( {
								frontImageShowCaption:
									defaultAttributes?.frontImageShowCaption.default,
							} );
						} }
					>
						<ToggleControl
							label="Show Caption"
							checked={ frontImageShowCaption }
							onChange={ ( value ) => {
								setAttributes( { frontImageShowCaption: value } );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } sections={ [ 'block', 'body', 'figure' ] } />
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
						options={ [ '16-9', '3-2', '4-3', '1', '3-4', '2-3', '9-16' ] }
						label="Change image grid aspect ratio"
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps }>
				{ children }
				<ResizableBox
					className={ `wp-block-capitola-two-image-block__imagecol --aspect-ratio-${ gridAspectRatio } --rear-position-${ rearImagePosition } ${ animationPreviewClass(
						revealAnimation,
						'figure'
					) }` }
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
					<ImageCard
						className="wp-block-capitola-two-image-block__rear-image"
						image={ rearImage }
						focalPoint={ rearImageFocalPoint }
						height={ rearImageHeight }
						width={ rearImageWidth }
						radius={ rearImageRadius }
						showCaption={ rearImageShowCaption }
						caption={ rearImageCaption }
						captionPlaceholder={ rearImageObj?.caption?.raw }
						onCaptionChange={ ( value ) => {
							setAttributes( {
								rearImageCaption: value,
							} );
						} }
					/>
					<ImageCard
						className="wp-block-capitola-two-image-block__front-image"
						image={ frontImage }
						focalPoint={ frontImageFocalPoint }
						height={ frontImageHeight }
						width={ frontImageWidth }
						radius={ frontImageRadius }
						showCaption={ frontImageShowCaption }
						caption={ frontImageCaption }
						captionPlaceholder={ frontImageObj?.caption?.raw }
						onCaptionChange={ ( value ) => {
							setAttributes( {
								frontImageCaption: value,
							} );
						} }
					/>
				</ResizableBox>
			</div>
		</div>
	);
}
