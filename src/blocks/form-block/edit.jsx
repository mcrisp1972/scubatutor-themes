import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel, AnimationPanel, animationPreviewClass } from '../../editor-controls';

export function Edit( props ) {
	const { attributes } = props;
	const { colorTheme, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-form-block__width alignwide ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [
				[
					'capitola/body-text',
					{
						className: 'wp-block-capitola-form-block__body',
					},
				],
				[
					'capitola/inner-block-wrap',
					{
						className: 'wp-block-capitola-form-block__form-col',
						allowedBlocks: [ 'gravityforms/form', 'wpforms/form-selector' ],
					},
				],
			],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</div>
	);
}
