import { useBlockProps } from '@wordpress/block-editor';
import { LinkList } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { links, isExample } = attributes;
	const blockProps = useBlockProps();

	return (
		<ul { ...blockProps }>
			<LinkList
				linkClass="wp-block-capitola-link-list__link --hyperlink"
				value={ links }
				disableAdd={ isExample }
				onChange={ ( value ) => {
					setAttributes( { links: value } );
				} }
			/>
		</ul>
	);
}
