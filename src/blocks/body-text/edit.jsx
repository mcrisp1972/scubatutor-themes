/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	InspectorControls,
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	RadioControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import {
	ImageSelect,
	CtaControl,
	TagSelect,
	ImageFocalPoint,
	OverlayOpacitySlider,
	JustifyToolbar,
	VerticalAlignToolbar,
	RadiusToolbar,
	animationPreviewClass,
} from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, name, context } = props;
	const {
		backgroundImage,
		borderRadius,
		imageOpacity,
		imageFocalPoint,
		verticalAlign,
		textAlign,
		eyebrow,
		headline,
		eyebrowTag,
		headlineTag,
		cta,
		cta2,
		isHeroVariation,
		imageScrollAnimation,
	} = attributes;

	const bodyTextOptions = context[ 'capitola/bodyTextOptions' ];
	const introAlign = context[ 'capitola/introAlign' ];
	const revealAnimation = context[ 'capitola/revealAnimation' ];

	const postTitle = useSelect(
		( select ) => {
			return isHeroVariation ? select( 'core/editor' ).getEditedPostAttribute( 'title' ) : '';
		},
		[ isHeroVariation ]
	);

	const imageClass = backgroundImage.id ? ' --has-bg-image --theme-image-overlay' : '';
	const justifyClass = verticalAlign === 'top' ? ' --justify-top' : '';

	const introPositionClass = ` --is-${ introAlign }-intro`;
	const introAlignClass =
		introAlign === 'top' && textAlign === 'center' ? ' --is-centered-intro' : '';
	const textAlignClass = textAlign === 'center' ? ' --text-align-center' : '';

	const defaultAttributes = getBlockType( name ).attributes;

	const blockProps = useBlockProps( {
		className: `${ justifyClass } ${ imageClass } ${ introPositionClass } ${ introAlignClass } ${ textAlignClass }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-body-text__intro',
		},
		{
			allowedBlocks: bodyTextOptions?.allowedInnerBlocks
				? bodyTextOptions?.allowedInnerBlocks
				: [ 'core/paragraph', 'core/heading', 'core/list', 'core/image' ],
			templateLock: false,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ ! bodyTextOptions?.disableBackgroundImage && (
					<ToolsPanel
						label="Image Settings"
						resetAll={ () => {
							setAttributes( {
								backgroundImage: defaultAttributes?.backgroundImage.default,
								imageFocalPoint: defaultAttributes?.imageFocalPoint.default,
								imageOpacity: defaultAttributes?.imageOpacity.default,
								imageScrollAnimation:
									defaultAttributes?.imageScrollAnimation.default,
							} );
						} }
					>
						<ToolsPanelItem
							hasValue={ () => {
								return !! backgroundImage.id;
							} }
							isShownByDefault={ true }
							label="Background Image"
							onDeselect={ () => {
								setAttributes( {
									backgroundImage: defaultAttributes?.backgroundImage.default,
								} );
							} }
						>
							<ImageSelect
								label="Background Image"
								value={ backgroundImage.id }
								onChange={ ( value ) => {
									setAttributes( {
										backgroundImage: {
											id: value.id,
											source_url: value.url,
										},
									} );
								} }
							/>
						</ToolsPanelItem>
						<ToolsPanelItem
							label="Focal Point"
							hasValue={ () => {
								return (
									imageFocalPoint !== defaultAttributes?.imageFocalPoint.default
								);
							} }
							onDeselect={ () => {
								setAttributes( {
									imageFocalPoint: defaultAttributes.imageFocalPoint.default,
								} );
							} }
						>
							<ImageFocalPoint
								image={ backgroundImage?.source_url }
								value={ imageFocalPoint }
								onChange={ ( value ) => {
									setAttributes( { imageFocalPoint: value } );
								} }
							/>
						</ToolsPanelItem>
						<ToolsPanelItem
							label="Image Overlay Opacity"
							hasValue={ () => {
								return imageOpacity !== defaultAttributes?.imageOpacity.default;
							} }
							onDeselect={ () => {
								setAttributes( {
									imageOpacity: defaultAttributes.imageOpacity.default,
								} );
							} }
						>
							<OverlayOpacitySlider
								value={ imageOpacity }
								onChange={ ( value ) => {
									setAttributes( { imageOpacity: value } );
								} }
							/>
						</ToolsPanelItem>
						<ToolsPanelItem
							label="Scroll Animation"
							hasValue={ () => {
								return (
									imageScrollAnimation !==
									defaultAttributes?.imageScrollAnimation.default
								);
							} }
							onDeselect={ () => {
								setAttributes( {
									imageScrollAnimation:
										defaultAttributes.imageScrollAnimation.default,
								} );
							} }
						>
							<RadioControl
								label="Scroll Animation"
								selected={ imageScrollAnimation }
								options={ [
									{ label: 'None', value: '' },
									{ label: 'Parallax', value: 'parallax' },
									{ label: 'Zoom', value: 'zoom' },
								] }
								onChange={ ( value ) => {
									setAttributes( { imageScrollAnimation: value } );
								} }
							/>
						</ToolsPanelItem>
					</ToolsPanel>
				) }
				<ToolsPanel
					label="H-Tags"
					resetAll={ () => {
						setAttributes( {
							eyebrowTag: defaultAttributes.eyebrowTag.default,
							headlineTag: defaultAttributes.headlineTag.default,
						} );
					} }
				>
					<ToolsPanelItem
						label="Eyebrow Tag"
						hasValue={ () => {
							return eyebrowTag !== defaultAttributes.eyebrowTag.default;
						} }
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								eyebrowTag: defaultAttributes.eyebrowTag.default,
							} );
						} }
					>
						<TagSelect
							label="Eyebrow Tag"
							value={ eyebrowTag }
							onChange={ ( value ) => {
								setAttributes( { eyebrowTag: value } );
							} }
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						label="Headline Tag"
						hasValue={ () => {
							return headlineTag !== defaultAttributes.headlineTag.default;
						} }
						isShownByDefault={ true }
						onDeselect={ () => {
							setAttributes( {
								headlineTag: defaultAttributes.headlineTag.default,
							} );
						} }
					>
						<TagSelect
							label="Headline Tag"
							value={ headlineTag }
							onChange={ ( value ) => {
								setAttributes( { headlineTag: value } );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					{ ! bodyTextOptions?.disableTextAlign && introAlign === 'top' && (
						<JustifyToolbar props={ props } attribute="textAlign" />
					) }
					{ ! bodyTextOptions?.disableVerticalAlign && introAlign !== 'top' && (
						<VerticalAlignToolbar props={ props } attribute="verticalAlign" />
					) }
					{ bodyTextOptions?.enableRadius && (
						<RadiusToolbar props={ props } attribute="borderRadius" />
					) }
				</ToolbarGroup>
			</BlockControls>
			{ !! backgroundImage.source_url && (
				<div
					className="wp-block-capitola-body-text__bg-image"
					style={ {
						'--capitola-overlayOpacity': imageOpacity,
						'--capitola-objectPosition': imageFocalPoint,
					} }
				>
					<img src={ backgroundImage.source_url } alt="" />
				</div>
			) }
			<div
				className={ `wp-block-capitola-body-text__grid ${ animationPreviewClass(
					revealAnimation,
					'body'
				) }` }
				style={ {
					borderRadius:
						borderRadius !== 'none'
							? `var(--wp--preset--border-radius--${ borderRadius })`
							: '',
				} }
			>
				<RichText
					className="wp-block-capitola-body-text__eyebrow --eyebrow"
					value={ eyebrow }
					allowedFormats={ [] }
					placeholder="Eyebrow..."
					onChange={ ( value ) => {
						setAttributes( { eyebrow: value } );
					} }
				/>
				<RichText
					className="wp-block-capitola-body-text__headline --hl-l"
					value={ headline }
					placeholder={ postTitle ? postTitle : 'Headline...' }
					allowedFormats={ [] }
					onChange={ ( value ) => {
						setAttributes( { headline: value } );
					} }
				/>
				<div { ...innerBlocksProps } />
				<div className="wp-block-capitola-body-text__ctas">
					<CtaControl
						className={
							'wp-block-capitola-body-text__cta --cta' +
							( backgroundImage.source_url ? ' --secondary' : '' )
						}
						value={ cta }
						onChange={ ( value ) => {
							setAttributes( { cta: value } );
						} }
					/>
					<CtaControl
						className={
							'wp-block-capitola-body-text__cta --cta' +
							( backgroundImage.source_url ? ' --tertiary' : ' --secondary' )
						}
						value={ cta2 }
						onChange={ ( value ) => {
							setAttributes( { cta2: value } );
						} }
					/>
				</div>
			</div>
		</div>
	);
}
