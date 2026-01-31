import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { ColorThemePanel, AnimationPanel, TruncateControl } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { colorTheme, showExcerpt, excerptLines, showImage } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
				style: { '--capitola-excerpt-lines': excerptLines },
			} ) }
		>
			<InspectorControls group="settings">
				<PanelBody title="Link List Options" initialOpen={ true }>
					<ToggleControl
						label="Show Featured Image"
						checked={ showImage }
						onChange={ ( value ) => {
							setAttributes( {
								showImage: value,
							} );
						} }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label="Show Excerpts"
						checked={ showExcerpt }
						onChange={ ( value ) => {
							setAttributes( {
								showExcerpt: value,
							} );
						} }
						__nextHasNoMarginBottom
					/>
					{ showExcerpt && (
						<TruncateControl
							value={ excerptLines }
							onChange={ ( value ) => {
								setAttributes( { excerptLines: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: 'wp-block-cwps-detailed-links__width alignwide',
					},
					{
						template: [ [ 'cwps/body-text' ], [ 'cwps/detailed-links-list' ] ],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
