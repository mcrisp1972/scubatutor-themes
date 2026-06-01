import { useBlockProps } from '@wordpress/block-editor';
export function Edit() {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<p>{ 'Spacer' }</p>
		</div>
	);
}
