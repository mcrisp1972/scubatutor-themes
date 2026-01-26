import { InspectorControls, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ColorThemePanel, JustifyToolbar, TextAlignToolbar } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;
	const { contentJustify, textAlign, colorTheme } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls>
				<ColorThemePanel props={ props } initialOpen={ true } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<JustifyToolbar
						props={ props }
						attribute="contentJustify"
						options={ [ 'right', 'left', 'center' ] }
					/>
					{ contentJustify === 'center' && (
						<TextAlignToolbar props={ props } attribute="textAlign" options={ [ 'left', 'center' ] } />
					) }
				</ToolbarGroup>
			</BlockControls>
			<div className="wp-block-cwps-open-content__width alignwide is-layout-constrained">
				<div
					{ ...useInnerBlocksProps(
						{
							className: `wp-block-cwps-open-content__content --justify-${ contentJustify } --align-${ textAlign }`,
						},
						{
							allowedBlocks: [
								'core/paragraph',
								'core/image',
								'core/heading',
								'core/list',
								'core/gallery',
								'core/video',
								'core/embed',
							],
						}
					) }
				/>
			</div>
		</div>
	);
}
