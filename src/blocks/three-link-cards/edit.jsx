import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel, AnimationPanel, animationPreviewClass } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes } = props;
	const { colorTheme, introAlign, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-three-link-cards__width alignwide --layout-${ introAlign } ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [ [ 'capitola/body-text' ], [ 'capitola/three-link-cards-grid' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</div>
	);
}
