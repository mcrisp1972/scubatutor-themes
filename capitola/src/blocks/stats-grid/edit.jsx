import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { animationPreviewClass, AddChildButton } from '@capitola/editor-controls';
import { StatsAnimationPreviewButton } from './preview';

export function Edit( props ) {
	const { attributes, context, clientId } = props;
	const { animatedStats, animatedStatsSpeed } = attributes;
	const innerBlockCount = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockCount( clientId );
		},
		[ clientId ]
	);
	const blockProps = useBlockProps( {
		className: `${
			innerBlockCount < 4 ? ` --count-${ innerBlockCount }` : ''
		} ${ animationPreviewClass( context[ 'capitola/revealAnimation' ], 'figure' ) }`,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: { name: 'capitola/stats-item' },
		allowedBlocks: [ 'capitola/stats-item' ],
		template: [ [ 'capitola/stats-item' ] ],
		templateLock: false,
		directInsert: true,
	} );
	const statsGridBlock = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlock( clientId );
		},
		[ clientId ]
	);
	const innerBlocks = statsGridBlock?.innerBlocks || [];
	const previewDuration = Number.isFinite( Number( animatedStatsSpeed ) )
		? Number( animatedStatsSpeed )
		: 2;

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="Stats Animation" initialOpen={ true }>
					<ToggleControl
						label="Animate Stats"
						checked={ animatedStats }
						onChange={ ( value ) => {
							props.setAttributes( { animatedStats: value } );
						} }
					/>
					{ animatedStats && (
						<RangeControl
							label="Animation Speed (seconds)"
							value={ animatedStatsSpeed }
							onChange={ ( value ) => {
								props.setAttributes( { animatedStatsSpeed: value } );
							} }
							min={ 0.25 }
							max={ 5 }
							step={ 0.25 }
						/>
					) }
					<StatsAnimationPreviewButton
						previewBlocks={ innerBlocks }
						duration={ previewDuration }
						disabled={ ! animatedStats }
					/>
				</PanelBody>
			</InspectorControls>
			<AddChildButton clientId={ clientId } label="Add Stat" />
			<div { ...innerBlocksProps } />
		</>
	);
}
