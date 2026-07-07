/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { getBlockType } from '@wordpress/blocks';
import {
	ToolbarGroup,
	RadioControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import {
	ImageSelect,
	ColorThemePanel,
	AnimationPanel,
	PlaceholderImage,
	ImageFocalPoint,
	IntroAlignToolbar,
	RadiusToolbar,
} from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, name, setAttributes } = props;
	const {
		introAlign,
		backgroundImage,
		imageFocalPoint,
		imageScrollAnimation,
		introRadius,
		colorTheme,
	} = attributes;
	const radiusClass = introRadius !== 'none' ? ` --has-${ introRadius }-radius` : '';
	const defaultAttributes = getBlockType( name ).attributes;
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
				<ToolsPanel
					label="Image Settings"
					resetAll={ () => {
						setAttributes( {
							backgroundImage: defaultAttributes?.backgroundImage.default,
							imageFocalPoint: defaultAttributes?.imageFocalPoint.default,
							imageScrollAnimation: defaultAttributes?.imageScrollAnimation.default,
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
							return imageFocalPoint !== defaultAttributes?.imageFocalPoint.default;
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
