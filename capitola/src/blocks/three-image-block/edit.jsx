/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	RadioControl,
	RangeControl,
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
	topPos = null,
	leftPos = null,
} ) {
	return (
		<figure
			className={ `${ className }` }
			style={ {
				borderRadius: `var(--wp--preset--border-radius--${ radius } )`,
				'--image-top-pos': topPos,
				'--image-left-pos': leftPos,
				'--image-height': height,
				'--image-width': width,
				'--capitola-objectPosition': focalPoint,
			} }
		>
			{ image?.source_url ? <img src={ image?.source_url } alt="" /> : <PlaceholderImage /> }
		</figure>
	);
}

export function Edit( props ) {
	const { attributes, setAttributes, toggleSelection, name } = props;

	const {
		frontImage,
		frontImageFocalPoint,
		frontImageHeight,
		frontImageRadius,
		frontImageWidth,
		gridAspectRatio,
		introAlign,
		mediaWidth,
		middleImage,
		middleImageFocalPoint,
		middleImageRadius,
		middleImageHeight,
		middleImageTopPos,
		middleImageLeftPos,
		middleImageWidth,
		rearImage,
		rearImageFocalPoint,
		rearImageHeight,
		rearImagePosition,
		rearImageRadius,
		rearImageWidth,
		revealAnimation,
		verticalAlign,
		colorTheme,
	} = attributes;

	const isMobile = useViewportMatch( 'medium', '<' );

	const [ tempWidth, setTempWidth ] = useState( null );

	const defaultAttributes = getBlockType( name ).attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-three-image-block__width alignwide --has-${ introAlign }-intro ${
				verticalAlign === 'top' ? ' --align-top' : ''
			} ${ animationPreviewClass( revealAnimation, 'block' ) }`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

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
								{ label: 'X-Large', value: 'xlarge' },
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
				</ToolsPanel>
				<ToolsPanel
					label="Middle Image"
					resetAll={ () => {
						setAttributes( {
							middleImage: defaultAttributes?.middleImage.default,
							middleImageRadius: defaultAttributes?.middleImageRadius.default,
							middleImageLeftPos: defaultAttributes?.middleImageLeftPos.default,
							middleImageTopPos: defaultAttributes?.middleImageTopPos.default,
							middleImageHeight: defaultAttributes?.middleImageHeight.default,
							middleImageWidth: defaultAttributes?.middleImageWidth.default,
							middleImageFocalPoint: defaultAttributes?.middleImageFocalPoint.default,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => {
							return middleImage.id;
						} }
						isShownByDefault={ true }
						label="Image"
						onDeselect={ () => {
							setAttributes( {
								middleImage: defaultAttributes?.middleImage.default,
							} );
						} }
					>
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
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								middleImageRadius !== defaultAttributes?.middleImageRadius.default
							);
						} }
						label="Radius"
						onDeselect={ () => {
							setAttributes( {
								middleImageRadius: defaultAttributes?.middleImageRadius.default,
							} );
						} }
					>
						<RadioControl
							label="Radius"
							selected={ middleImageRadius }
							options={ [
								{ label: 'None', value: '' },
								{ label: 'Small', value: 'small' },
								{ label: 'Medium', value: 'medium' },
								{ label: 'Large', value: 'large' },
								{ label: 'X-Large', value: 'xlarge' },
							] }
							onChange={ ( value ) => {
								return setAttributes( { middleImageRadius: value } );
							} }
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								middleImageTopPos !== defaultAttributes?.middleImageTopPos.default
							);
						} }
						label="Top Position"
						onDeselect={ () => {
							setAttributes( {
								middleImageTopPos: defaultAttributes?.middleImageTopPos.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								middleImageLeftPos !== defaultAttributes?.middleImageLeftPos.default
							);
						} }
						label="Left Position"
						onDeselect={ () => {
							setAttributes( {
								middleImageLeftPos: defaultAttributes?.middleImageLeftPos.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								middleImageHeight !== defaultAttributes?.middleImageHeight.default
							);
						} }
						label="Height"
						onDeselect={ () => {
							setAttributes( {
								middleImageHeight: defaultAttributes?.middleImageHeight.default,
							} );
						} }
					>
						<RangeControl
							label="Height"
							value={ middleImageHeight }
							withInputField={ false }
							min={ 1 }
							max={ 20 }
							step={ 1 }
							onChange={ ( value ) => {
								return setAttributes( { middleImageHeight: value } );
							} }
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return middleImageWidth !== defaultAttributes?.middleImageWidth.default;
						} }
						label="Width"
						onDeselect={ () => {
							setAttributes( {
								middleImageWidth: defaultAttributes?.middleImageWidth.default,
							} );
						} }
					>
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
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => {
							return (
								middleImageFocalPoint !==
								defaultAttributes?.middleImageFocalPoint.default
							);
						} }
						label="Focal Point"
						onDeselect={ () => {
							setAttributes( {
								middleImageFocalPoint:
									defaultAttributes?.middleImageFocalPoint.default,
							} );
						} }
					>
						{ middleImage.source_url && (
							<ImageFocalPoint
								image={ middleImage.source_url }
								value={ middleImageFocalPoint }
								onChange={ ( value ) => {
									setAttributes( { middleImageFocalPoint: value } );
								} }
							/>
						) }
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
								{ label: 'X-Large', value: 'xlarge' },
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
						options={ [ '16-9', '3-2', '4-3', 'square', '3-4', '2-3', '9-16' ] }
						label="Change image grid aspect ratio"
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps }>
				{ children }
				<ResizableBox
					className={ `wp-block-capitola-three-image-block__imagecol --rear-position-${ rearImagePosition } ${ animationPreviewClass(
						revealAnimation,
						'figure'
					) }` }
					size={ {
						width: isMobile ? '100%' : mediaWidth + '%',
					} }
					style={ {
						flexBasis: 'unset',
						'--capitola-flex-basis': mediaWidth + '%',
						aspectRatio: `var(--wp--preset--aspect-ratio--${ gridAspectRatio })`,
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
						className="wp-block-capitola-three-image-block__rear-image"
						image={ rearImage }
						focalPoint={ rearImageFocalPoint }
						height={ rearImageHeight }
						width={ rearImageWidth }
						radius={ rearImageRadius }
					/>
					<ImageCard
						className="wp-block-capitola-three-image-block__middle-image"
						image={ middleImage }
						focalPoint={ middleImageFocalPoint }
						height={ middleImageHeight }
						width={ middleImageWidth }
						radius={ middleImageRadius }
						topPos={ middleImageTopPos }
						leftPos={ middleImageLeftPos }
					/>
					<ImageCard
						className="wp-block-capitola-three-image-block__front-image"
						image={ frontImage }
						focalPoint={ frontImageFocalPoint }
						height={ frontImageHeight }
						width={ frontImageWidth }
						radius={ frontImageRadius }
					/>
				</ResizableBox>
			</div>
		</div>
	);
}
