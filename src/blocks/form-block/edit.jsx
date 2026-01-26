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
						className: 'wp-block-cwps-form-block__width alignwide',
					},
					{
						template: [
							[
								'cwps/body-text',
								{
									className: 'wp-block-cwps-form-block__body',
								},
							],
							[
								'cwps/inner-block-wrap',
								{
									className: 'wp-block-cwps-form-block__form-col cwps-form',
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
