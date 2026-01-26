import { InspectorControls, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { ColorThemePanel, AnimationPanel, IntroAlignToolbar, JustifyToolbar } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;

	const { iconBackground, textAlignment, colorTheme, introAlign } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="styles">
				<PanelBody title="Settings" initialOpen={ true }>
					<ToggleControl
						label="Icon Background"
						checked={ iconBackground }
						onChange={ ( value ) => {
							props.setAttributes( { iconBackground: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } allowFigureReveal={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar props={ props } attribute="introAlign" options={ [ 'right', 'left', 'top' ] } />
					<JustifyToolbar
						props={ props }
						label="Change icon text alignment"
						attribute="textAlignment"
						options={ [ 'left', 'center' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-cwps-icons__width alignwide --has-${ introAlign }-intro ${
							iconBackground ? '--has-icon-background' : ''
						} --item-align-${ textAlignment }`,
					},
					{
						template: [
							[
								'cwps/body-text',
								{
									className: 'wp-block-cwps-icons__body',
								},
							],
							[ 'cwps/icon-grid' ],
						],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
