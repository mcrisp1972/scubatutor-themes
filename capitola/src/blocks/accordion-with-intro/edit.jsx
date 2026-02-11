import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { ColorThemePanel, AnimationPanel } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { stickyIntro, colorTheme } = attributes;

	const accordionBlock = useSelect( ( select ) => {
		const block = select( 'core/block-editor' ).getBlock( clientId );
		return block.innerBlocks[ 1 ];
	} );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
			} ) }
		>
			<InspectorControls group="settings">
				<PanelBody title="Accordion Options" initialOpen={ true }>
					<ToggleControl
						label="Keep Items Open"
						checked={ accordionBlock?.attributes?.keepOpen || false }
						onChange={ ( value ) => {
							if ( accordionBlock ) {
								updateBlockAttributes( accordionBlock.clientId, {
									keepOpen: value,
								} );
							}
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } initialOpen={ true } />
				<AnimationPanel props={ props } />
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-capitola-accordion-with-intro__width alignwide ${
							stickyIntro ? '--sticky-intro' : ''
						}`,
					},
					{
						template: [
							[ 'capitola/body-text', { verticalAlign: 'top' } ],
							[ 'capitola/accordion' ],
						],
						templateLock: 'all',
					}
				) }
			/>
		</div>
	);
}
