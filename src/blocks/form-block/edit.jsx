import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ColorThemePanel, AnimationPanel } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes } = props;

	const { colorTheme } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: 'wp-block-capitola-form-block__width alignwide',
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
									className: 'wp-block-capitola-form-block__form-col capitola-form',
									allowedBlocks: [ 'gravityforms/form', 'wpforms/form-selector' ],
								},
							],
						],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
