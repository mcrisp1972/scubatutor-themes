import {
	InspectorControls,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import {
	ColorThemePanel,
	AnimationPanel,
	IntroAlignToolbar,
	animationPreviewClass,
} from '../../editor-controls';

export function Edit( props ) {
	const { attributes } = props;
	const { colorTheme, introAlign, revealAnimation } = attributes;

	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-tabbed-contents__width alignwide --has-${ introAlign }-intro ${ animationPreviewClass(
				revealAnimation,
				'block'
			) }`,
		},
		{
			template: [
				[ 'capitola/body-text', { verticalAlign: 'top' } ],
				[ 'capitola/tabbed-contents-tabs' ],
			],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } sections={ [ 'block', 'body', 'figure' ] } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<IntroAlignToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'left', 'top' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps } />
		</div>
	);
}
