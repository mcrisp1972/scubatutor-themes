import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import {
	ColorThemePanel,
	AnimationPanel,
	IntroAlignToolbar,
	JustifyToolbar,
	animationPreviewClass,
	AddGrandChildButton,
} from '../../editor-controls';

export function Edit( props ) {
	const { attributes, clientId } = props;
	const { iconBackground, textAlignment, colorTheme, introAlign, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-icons__width alignwide --has-${ introAlign }-intro ${
				iconBackground ? '--has-icon-background' : ''
			} --item-align-${ textAlignment } ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [
				[
					'capitola/body-text',
					{
						className: 'wp-block-capitola-icons__body',
					},
				],
				[ 'capitola/icon-grid' ],
			],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<PanelBody title="Settings" initialOpen={ true }>
					<ToggleControl
						label="Icon Background"
						checked={ iconBackground }
						onChange={ ( value ) => {
							props.setAttributes( { iconBackground: value } );
						} }
					/>
				</PanelBody>
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } sections={ [ 'block', 'body', 'figure' ] } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left', 'top' ] }
					/>
					<JustifyToolbar
						props={ props }
						label="Change icon text alignment"
						attribute="textAlignment"
						options={ [ 'left', 'center' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<AddGrandChildButton
				clientId={ clientId }
				targetBlockName="capitola/icon-grid"
				label="Add Icon"
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
