import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import {
	AddGrandChildButton,
	ColorThemePanel,
	AnimationPanel,
	TruncateControl,
	animationPreviewClass,
} from '../../editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { colorTheme, showExcerpt, excerptLines, showImage, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
		style: { '--wp--custom--truncate-lines': excerptLines },
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-detailed-links__width alignwide ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [ [ 'capitola/body-text' ], [ 'capitola/detailed-links-list' ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
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
					/>
					<ToggleControl
						label="Show Excerpts"
						checked={ showExcerpt }
						onChange={ ( value ) => {
							setAttributes( {
								showExcerpt: value,
							} );
						} }
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
				<AnimationPanel props={ props } sections={ [ 'block', 'body', 'figure' ] } />
			</InspectorControls>
			<AddGrandChildButton
				clientId={ clientId }
				targetBlockName="capitola/detailed-links-list"
				label="Add Detailed Link"
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
