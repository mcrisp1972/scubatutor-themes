import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, context } = props;
	const { pillLabel } = attributes;

	const activeClass = context[ 'capitola/activePanel' ] === clientId ? '--active' : '';

	const innerBlockCount = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlock( clientId ).innerBlocks;
	} );

	const appenderToUse = () => {
		if ( innerBlockCount.length < 6 ) {
			return <InnerBlocks.DefaultBlockAppender />;
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<TextControl
						label="Pill Label"
						value={ pillLabel }
						onChange={ ( value ) => {
							setAttributes( { pillLabel: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useInnerBlocksProps( useBlockProps( { className: activeClass } ), {
					allowedBlocks: [
						'core/paragraph',
						'core/heading',
						'core/list',
						'core/buttons',
						'core/image',
						'core/video',
					],
					renderAppender: () => {
						return appenderToUse();
					},
				} ) }
			/>
		</>
	);
}
