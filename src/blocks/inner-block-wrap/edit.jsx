import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit( props ) {
	const { attributes } = props;

	const { allowedBlocks, templateLock } = attributes;

	const innerBlocksProps = useInnerBlocksProps( useBlockProps(), {
		allowedBlocks,
		templateLock,
	} );

	return <div { ...innerBlocksProps } />;
}
