import { InspectorControls, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import {
	ImageSelect,
	ColorThemePanel,
	AnimationPanel,
	PlaceholderImage,
	ImageAlignMatrix,
	IntroAlignToolbar,
	RadiusToolbar,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { introAlign, backgroundImage, imageCropPosition, imageParallax, introRadius, colorTheme } = attributes;
	const radiusClass = introRadius !== 'none' ? ` --has-${ introRadius }-radius` : '';

	return (
		<div { ...useBlockProps( { className: `alignfull --theme-${ colorTheme }` } ) }>
			<InspectorControls group="settings">
				<PanelBody title="Image" initialOpen={ true }>
					<ImageSelect
						label="Image"
						value={ backgroundImage.id }
						onChange={ ( value ) => {
							return setAttributes( { backgroundImage: { id: value.id, source_url: value.url } } );
						} }
					/>
					<ImageAlignMatrix
						label="Image Crop Position"
						value={ imageCropPosition }
						onChange={ ( value ) => {
							setAttributes( { imageCropPosition: value } );
						} }
					/>
					<ToggleControl
						label="Parallax Scrolling"
						checked={ imageParallax }
						onChange={ ( value ) => {
							setAttributes( { imageParallax: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar props={ props } attribute="introAlign" options={ [ 'right', 'left' ] } />
					<RadiusToolbar props={ props } attribute="introRadius" options={ [ 'none', 'small', 'medium' ] } />
				</ToolbarGroup>
			</BlockControls>
			<div
				className="wp-block-cwps-bg-image-text__imagewrap"
				style={ { '--cwps-objectPosition': imageCropPosition } }
			>
				{ backgroundImage.source_url ? (
					<img src={ backgroundImage.source_url } alt="" />
				) : (
					<PlaceholderImage />
				) }
			</div>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-cwps-bg-image-text__width --has-${ introAlign }-intro ${ radiusClass }`,
					},
					{
						template: [ [ 'cwps/body-text' ] ],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
