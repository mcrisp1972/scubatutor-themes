import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export function Edit( props ) {
	const { attributes } = props;

	const { allowedBlocks, templateLock } = attributes;

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		templateLock,
	} );

	return <div { ...innerBlocksProps } />;
}
