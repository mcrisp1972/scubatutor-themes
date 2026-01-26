import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel, AnimationPanel } from '../../editor-controls';

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
				<AnimationPanel props={ props } allowFigureReveal={ true } />
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-cwps-three-link-cards__width alignwide --layout-${ introAlign }`,
					},
					{
						template: [ [ 'cwps/body-text' ], [ 'cwps/three-link-cards-grid' ] ],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
