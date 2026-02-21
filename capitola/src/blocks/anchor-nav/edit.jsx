import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;
	const { colorTheme } = attributes;
	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls>
				<ColorThemePanel props={ props } initialOpen={ true } />
			</InspectorControls>

			<div className="wp-block-capitola-anchor-nav__width">
				<div
					{ ...useInnerBlocksProps(
						{
							className: 'wp-block-capitola-anchor-nav__list',
						},
						{
							defaultBlock: { name: 'capitola/anchor-nav-item' },
							allowedBlocks: [ 'capitola/anchor-nav-item' ],
							template: [ [ 'capitola/anchor-nav-item' ] ],
							directInsert: true,
						}
					) }
				/>
			</div>
		</div>
	);
}
