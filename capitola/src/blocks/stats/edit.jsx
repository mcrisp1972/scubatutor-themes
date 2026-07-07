import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import {
	ColorThemePanel,
	AnimationPanel,
	IntroAlignToolbar,
	JustifyToolbar,
	animationPreviewClass,
	AddGrandChildButton,
} from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, clientId } = props;
	const { colorTheme, introAlign, textAlignment, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-stats__width alignwide --has-${ introAlign }-intro --item-align-${ textAlignment } ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [
				[
					'capitola/body-text',
					{
						className: 'wp-block-capitola-stats__body',
					},
				],
				[ 'capitola/stats-grid' ],
			],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
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
						label="Change stat text alignment"
						attribute="textAlignment"
						options={ [ 'left', 'center' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<AddGrandChildButton
				clientId={ clientId }
				targetBlockName="capitola/stats-grid"
				label="Add Stat"
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
