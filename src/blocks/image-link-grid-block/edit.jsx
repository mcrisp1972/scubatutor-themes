import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import {
	ColorThemePanel,
	AnimationPanel,
	animationPreviewClass,
	AddGrandChildButton,
} from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, clientId } = props;
	const { colorTheme, revealAnimation } = attributes;

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
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<AddGrandChildButton
				clientId={ clientId }
				targetBlockName="capitola/image-link-grid"
				label="Add Link Grid Item"
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
