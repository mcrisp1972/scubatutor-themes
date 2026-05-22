import {
	InspectorControls,
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	ImageSelect,
	CtaControl,
	TagSelect,
	ImageFocalPoint,
	OverlayOpacitySlider,
	JustifyToolbar,
	VerticalAlignToolbar,
	animationPreviewClass,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		backgroundImage,
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
		imageParallax,
	} = attributes;
	const { bodyTextOptions, introAlign, revealAnimation } = context;

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
					<PanelBody title="Image" initialOpen={ true }>
						<ImageSelect
							label="Background Image"
							value={ backgroundImage.id }
							onChange={ ( value ) => {
								return setAttributes( {
									backgroundImage: {
										id: value.id,
										source_url: value.url,
									},
								} );
							} }
						/>
						{ !! backgroundImage.id && (
							<OverlayOpacitySlider
								value={ imageOpacity }
								onChange={ ( value ) => {
									setAttributes( { imageOpacity: value } );
								} }
							/>
						) }
						{ !! backgroundImage.id && (
							<ToggleControl
								label="Parallax Scrolling"
								checked={ imageParallax }
								onChange={ ( value ) => {
									setAttributes( { imageParallax: value } );
								} }
								__nextHasNoMarginBottom
							/>
						) }
						{ !! backgroundImage.id && (
							<ImageFocalPoint
								image={ backgroundImage.id }
								value={ imageFocalPoint }
								onChange={ ( value ) => {
									setAttributes( {
										imageFocalPoint: value,
									} );
								} }
							/>
						) }
					</PanelBody>
				) }
				<PanelBody
					title="Markup"
					initialOpen={ bodyTextOptions?.disableBackgroundImage ? true : false }
				>
					<TagSelect
						label="Eyebrow Tag"
						value={ eyebrowTag }
						onChange={ ( value ) => {
							setAttributes( { eyebrowTag: value } );
						} }
					/>
					<TagSelect
						label="Headline Tag"
						value={ headlineTag }
						onChange={ ( value ) => {
							setAttributes( { headlineTag: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					{ ! bodyTextOptions?.disableTextAlign && introAlign === 'top' && (
						<JustifyToolbar props={ props } attribute="textAlign" />
					) }
					{ ! bodyTextOptions?.disableVerticalAlign && introAlign !== 'top' && (
						<VerticalAlignToolbar props={ props } attribute="verticalAlign" />
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
