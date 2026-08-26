import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl } from '@wordpress/components';

export function Edit( props ) {
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

	const blockProps = useBlockProps( { className: activeClass } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
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
	} );

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
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
