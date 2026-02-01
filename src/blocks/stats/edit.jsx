import { InspectorControls, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ColorThemePanel, AnimationPanel, IntroAlignToolbar, JustifyToolbar } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;
	const { colorTheme, introAlign, textAlignment } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } allowFigureReveal={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar props={ props } attribute="introAlign" options={ [ 'right', 'left', 'top' ] } />
					<JustifyToolbar
						props={ props }
						label="Change stat text alignment"
						attribute="textAlignment"
						options={ [ 'left', 'center' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-capitola-stats__width alignwide --has-${ introAlign }-intro --item-align-${ textAlignment }`,
					},
					{
						template: [
							[
								'capitola/body-text',
								{
									className: 'wp-block-capitola-stats__body',
								},
							],
							[ 'capitola/stats-grid' ],
						],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
