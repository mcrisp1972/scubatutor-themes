import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export function Edit( { attributes } ) {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<InspectorControls />
			<Fragment>
				<ServerSideRender block="capitola/svg-list-block" attributes={ attributes } />
			</Fragment>
		</div>
	);
}
