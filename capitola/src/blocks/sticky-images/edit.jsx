import {
	InspectorControls,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	PanelBody,
	ToolbarGroup,
	RadioControl,
	ToggleControl,
	RangeControl,
	ResizableBox,
} from '@wordpress/components';
import {
	ColorThemePanel,
	ImageSelectButton,
	RadiusToolbar,
	VerticalAlignToolbar,
	IntroAlignToolbar,
	AddChildButton,
} from '../../editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, isSelected, clientId, toggleSelection } = props;
	const isMobile = useViewportMatch( 'medium', '<' );
	const [ tempWidth, setTempWidth ] = useState( null );
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const {
		mediaWidth,
		verticalAlign,
		introAlign,
		imageRadius,
		transitionMode,
		imageLayout,
		showFullImage,
		colorTheme,
		isExample,
	} = attributes;

	const innerBlocks = useSelect( ( select ) => {
		const block = select( 'core/block-editor' ).getBlock( clientId );
		return block.innerBlocks;
	} );

	const imageValues = innerBlocks.map( ( block ) => {
		return block.attributes.sideImage;
	} );

	const imageCaptions = useSelect(
		( select ) => {
			const imageIds = innerBlocks.map( ( block ) => {
				return block.attributes.sideImage.id;
			} );
			const { getEntityRecord } = select( 'core' );
			const captions = {};
			imageIds.forEach( ( id ) => {
				if ( id ) {
					const media = getEntityRecord( 'postType', 'attachment', id );
					if ( media ) {
						captions[ id ] = media.caption.raw;
					}
				}
			} );
			return captions;
		},
		[ innerBlocks ]
	);

	const justifyClass = verticalAlign === 'top' ? ' --justify-top' : '';

	const blockProps = useBlockProps( {
		className: `alignfull --has-scroll-transition is-layout-constrained has-global-padding --theme-${ colorTheme }
          		${ imageLayout === 'full' ? ' --layout-full' : '' }
           		--intro-${ introAlign }
          		${ justifyClass } ${ imageLayout === 'inner' ? `--has-${ imageRadius }-radius` : '' } ${
					showFullImage && imageLayout === 'inner' ? ' --full-image' : ''
				}`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-sticky-images__body-column --align-${ verticalAlign }`,
		},
		{
			defaultBlock: {
				name: 'capitola/sticky-images-section',
			},
			allowedBlocks: [ 'capitola/sticky-images-section' ],
			template: [ [ 'capitola/sticky-images-section' ] ],
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Settings" initialOpen={ true }>
					<RadioControl
						label="Image Layout"
						selected={ imageLayout }
						options={ [
							{ label: 'Inner', value: 'inner' },
							{ label: 'Full', value: 'full' },
						] }
						onChange={ ( value ) => {
							setAttributes( { imageLayout: value } );
						} }
					/>
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
					{ imageLayout === 'inner' && (
						<ToggleControl
							label="Disable Image Cropping"
							checked={ showFullImage }
							onChange={ ( value ) => {
								setAttributes( { showFullImage: value } );
							} }
							help="When enabled, images will display in their entirety rather than being cropped to fill the image area."
						/>
					) }
					<RadioControl
						label="Transition"
						selected={ transitionMode }
						options={ [
							{ label: 'Sticky Scroll', value: 'scroll' },
							{ label: 'Fade In', value: 'fade' },
						] }
						onChange={ ( value ) => {
							setAttributes( { transitionMode: value } );
						} }
						help={
							transitionMode === 'fade'
								? 'Fade transition is not previewed in the editor.'
								: ''
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left' ] }
					/>
					<VerticalAlignToolbar props={ props } attribute="verticalAlign" />
					{ imageLayout === 'inner' && (
						<RadiusToolbar
							props={ props }
							attribute="imageRadius"
							options={ [ 'none', 'small', 'medium', 'large' ] }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			<AddChildButton clientId={ clientId } label="Add Section" />
			<div
				className={ `wp-block-capitola-sticky-images__width ${
					imageLayout === 'full' ? 'alignfull' : 'alignwide'
				}` }
			>
				<ResizableBox
					className="wp-block-capitola-sticky-images__image-column"
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
					{ imageValues.map( ( image, index ) => {
						return (
							<div
								key={ index }
								className={ `wp-block-capitola-sticky-images__imagewrap ${
									isExample ? 'is-example' : ''
								}` }
							>
								<div
									className="wp-block-capitola-sticky-images__imageratio"
									style={ {
										'--capitola-objectPosition':
											innerBlocks[ index ].attributes.imageFocalPoint,
									} }
								>
									{ image.source_url ? (
										<>
											<img src={ image.source_url } alt="" />
											{ isSelected && (
												<ImageSelectButton
													onSelect={ ( value ) => {
														updateBlockAttributes(
															innerBlocks[ index ].clientId,
															{
																sideImage: {
																	id: value.id,
																	source_url: value.url,
																},
															}
														);
													} }
													value={ image.id }
													flexWrap={ true }
												/>
											) }
											{ innerBlocks[ index ].attributes.showCaption && (
												<RichText
													className="wp-block-capitola-sticky-images__image-caption --micro-text"
													value={
														innerBlocks[ index ].attributes
															.captionOverride
													}
													allowedFormats={ [] }
													placeholder={ imageCaptions[ image.id ] }
													onChange={ ( value ) => {
														updateBlockAttributes(
															innerBlocks[ index ].clientId,
															{
																captionOverride: value,
															}
														);
													} }
												/>
											) }
										</>
									) : (
										<MediaPlaceholder
											onSelect={ ( value ) => {
												updateBlockAttributes(
													innerBlocks[ index ].clientId,
													{
														sideImage: {
															id: value.id,
															source_url: value.url,
														},
													}
												);
											} }
											value={ image.id }
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											style={ {
												height: '100%',
												borderRadius: '6px',
											} }
										/>
									) }
								</div>
							</div>
						);
					} ) }
				</ResizableBox>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
