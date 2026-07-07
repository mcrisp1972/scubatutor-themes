import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ColorThemePanel, JustifyToolbar, TextAlignToolbar } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes } = props;
	const { contentJustify, textAlign, colorTheme } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-open-content__content --justify-${ contentJustify } --align-${ textAlign }`,
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
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<ColorThemePanel props={ props } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<JustifyToolbar
						props={ props }
						attribute="contentJustify"
						options={ [ 'right', 'left', 'center' ] }
					/>
					{ contentJustify === 'center' && (
						<TextAlignToolbar
							props={ props }
							attribute="textAlign"
							options={ [ 'left', 'center' ] }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			<div className="wp-block-capitola-open-content__width alignwide is-layout-constrained">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
