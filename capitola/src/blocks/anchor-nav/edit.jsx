import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel } from '../../editor-controls';

export function Edit( props ) {
	const { attributes } = props;
	const { colorTheme } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull --theme-${ colorTheme }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-anchor-nav__list',
		},
		{
			defaultBlock: { name: 'capitola/anchor-nav-item' },
			allowedBlocks: [ 'capitola/anchor-nav-item' ],
			template: [ [ 'capitola/anchor-nav-item' ] ],
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<ColorThemePanel props={ props } initialOpen={ true } />
			</InspectorControls>
			<div className="wp-block-capitola-anchor-nav__width">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
