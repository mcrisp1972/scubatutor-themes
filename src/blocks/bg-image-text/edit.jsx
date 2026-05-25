import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import {
	ImageSelect,
	ColorThemePanel,
	AnimationPanel,
	PlaceholderImage,
	ImageFocalPoint,
	IntroAlignToolbar,
	RadiusToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { introAlign, backgroundImage, imageFocalPoint, imageParallax, introRadius, colorTheme } =
		attributes;
	const radiusClass = introRadius !== 'none' ? ` --has-${ introRadius }-radius` : '';
	const blockProps = useBlockProps( {
		className: `alignfull --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-bg-image-text__width --has-${ introAlign }-intro ${ radiusClass }`,
		},
		{
			template: [ [ 'capitola/body-text' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Image" initialOpen={ true }>
					<ImageSelect
						label="Image"
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
						<ImageFocalPoint
							value={ imageFocalPoint }
							image={ backgroundImage.id }
							onChange={ ( value ) => {
								setAttributes( { imageFocalPoint: value } );
							} }
						/>
					) }
					<ToggleControl
						label="Parallax Scrolling"
						checked={ imageParallax }
						onChange={ ( value ) => {
							setAttributes( { imageParallax: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } sections={ [] } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left' ] }
					/>
					<RadiusToolbar
						props={ props }
						attribute="introRadius"
						options={ [ 'none', 'small', 'medium' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div
				className="wp-block-capitola-bg-image-text__imagewrap"
				style={ { '--capitola-objectPosition': imageFocalPoint } }
			>
				{ backgroundImage.source_url ? (
					<img src={ backgroundImage.source_url } alt="" />
				) : (
					<PlaceholderImage />
				) }
			</div>
			<div { ...innerBlocksProps } />
		</div>
	);
}
