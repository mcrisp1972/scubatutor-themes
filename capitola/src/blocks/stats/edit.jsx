import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { ToolbarGroup, PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import {
	ColorThemePanel,
	AnimationPanel,
	IntroAlignToolbar,
	JustifyToolbar,
	animationPreviewClass,
	AddGrandChildButton,
} from '@capitola/editor-controls';
import { StatsAnimationPreviewButton } from '@capitola/blocks/stats-grid/preview';

export function Edit( props ) {
	const { attributes, clientId } = props;
	const { colorTheme, introAlign, textAlignment, revealAnimation } = attributes;
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const statsGridBlock = useSelect(
		( select ) => {
			const block = select( 'core/block-editor' ).getBlock( clientId );
			return block?.innerBlocks?.find( ( childBlock ) => {
				return childBlock.name === 'capitola/stats-grid';
			} );
		},
		[ clientId ]
	);
	const animatedStats = statsGridBlock?.attributes?.animatedStats ?? true;
	const animatedStatsSpeed = statsGridBlock?.attributes?.animatedStatsSpeed ?? 2;
	const statsGridBlocks = statsGridBlock?.innerBlocks || [];

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
			<InspectorControls group="settings">
				<PanelBody title="Stats Animation" initialOpen={ true }>
					<ToggleControl
						label="Animate Stats"
						checked={ animatedStats }
						onChange={ ( value ) => {
							if ( statsGridBlock ) {
								updateBlockAttributes( statsGridBlock.clientId, {
									animatedStats: value,
								} );
							}
						} }
					/>
					{ animatedStats && (
						<RangeControl
							label="Animation Speed (seconds)"
							value={ animatedStatsSpeed }
							onChange={ ( value ) => {
								if ( statsGridBlock ) {
									updateBlockAttributes( statsGridBlock.clientId, {
										animatedStatsSpeed: value,
									} );
								}
							} }
							min={ 0.25 }
							max={ 5 }
							step={ 0.25 }
						/>
					) }
					<StatsAnimationPreviewButton
						previewBlocks={ statsGridBlocks }
						duration={ animatedStatsSpeed }
						disabled={ ! animatedStats }
					/>
				</PanelBody>
			</InspectorControls>
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
