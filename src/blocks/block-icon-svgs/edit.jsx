import { useBlockProps } from '@wordpress/block-editor';
import { default as IconList } from './iconList';

export default function Edit() {
	const blockProps = useBlockProps( { className: 'alignwide' } );

	return (
		<div { ...blockProps }>
			<IconList />
		</div>
	);
}
