import { InspectorControls, BlockControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ColorThemePanel, AnimationPanel, IntroAlignToolbar } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;
	const { colorTheme, introAlign } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } allowFigureReveal={ true } initialOpen={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar props={ props } attribute="introAlign" options={ [ 'left', 'top' ] } />
				</ToolbarGroup>
			</BlockControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-capitola-tabbed-contents__width alignwide --has-${ introAlign }-intro`,
					},
					{
						template: [ [ 'capitola/body-text', { verticalAlign: 'top' } ], [ 'capitola/tabbed-contents-tabs' ] ],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
