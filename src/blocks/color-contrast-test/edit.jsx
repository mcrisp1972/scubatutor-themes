import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes } ) {
	return (
		<div { ...useBlockProps( { className: 'alignfull' } ) }>
			<ServerSideRender block="cwps/post-feed" attributes={ attributes } />
		</div>
	);
}
