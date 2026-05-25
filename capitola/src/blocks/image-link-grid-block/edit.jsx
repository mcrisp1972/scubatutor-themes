import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import {
	TruncateControl,
	ColorThemePanel,
	AnimationPanel,
	animationPreviewClass,
} from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { gridLayout, gridGap, excerptLines, colorTheme, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `alignwide wp-block-capitola-image-link-grid-block__width ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [ [ 'capitola/body-text' ], [ 'capitola/image-link-grid' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Layout" initialOpen={ true }>
					<SelectControl
						label="Layout"
						value={ gridLayout }
						options={ [
							{ label: '3 Col', value: '3-col' },
							{ label: '4 Col', value: '4-col' },
						] }
						onChange={ ( value ) => {
							setAttributes( { gridLayout: value } );
						} }
						__next40pxDefaultSize
					/>
					<ToggleControl
						label="Grid Gap"
						checked={ gridGap }
						onChange={ ( value ) => {
							setAttributes( {
								gridGap: value,
							} );
						} }
					/>
					<TruncateControl
						value={ excerptLines }
						onChange={ ( value ) => {
							setAttributes( { excerptLines: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</div>
	);
}
