import {
	InspectorControls,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, ToolbarGroup, RadioControl } from '@wordpress/components';
import {
	ColorThemePanel,
	ImageSelectButton,
	RadiusToolbar,
	VerticalAlignToolbar,
	IntroAlignToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const {
		verticalAlign,
		introAlign,
		imageRadius,
		transitionMode,
		imageLayout,
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

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull --has-scroll-transition is-layout-constrained has-global-padding --theme-${ colorTheme }
          ${ imageLayout === 'full' ? ' --layout-full' : '' }
           --intro-${ introAlign }
          ${ justifyClass } ${ imageLayout === 'inner' ? `--has-${ imageRadius }-radius` : '' }`,
			} ) }
		>
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
			<div
				className={ `wp-block-capitola-sticky-images__width ${
					imageLayout === 'full' ? 'alignfull' : 'alignwide'
				}` }
			>
				<div className="wp-block-capitola-sticky-images__image-column">
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
											innerBlocks[ index ].attributes.imageCropPosition,
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
											style={ { height: '100%', borderRadius: '6px' } }
										/>
									) }
								</div>
							</div>
						);
					} ) }
				</div>
				<div
					{ ...useInnerBlocksProps(
						{
							className: `wp-block-capitola-sticky-images__body-column --align-${ verticalAlign }`,
						},
						{
							defaultBlock: { name: 'capitola/sticky-images-section' },
							allowedBlocks: [ 'capitola/sticky-images-section' ],
							template: [ [ 'capitola/sticky-images-section' ] ],
							directInsert: true,
						}
					) }
				/>
			</div>
		</div>
	);
}
