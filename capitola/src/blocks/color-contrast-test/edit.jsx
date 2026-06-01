import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

export function Edit( { attributes } ) {
	const blockProps = useBlockProps( { className: 'alignfull' } );
	return (
		<div { ...blockProps }>
			<ServerSideRender block="capitola/post-feed" attributes={ attributes } />
		</div>
	);
}
