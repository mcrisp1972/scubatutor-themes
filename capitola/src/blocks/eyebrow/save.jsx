import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { textAlign, content, tag } = attributes;
	const TagName = tag === 0 ? 'div' : 'h' + tag;

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: `--eyebrow ${ textAlign ? `has-text-align-${ textAlign }` : '' }`,
			} ) }
		>
			<RichText.Content value={ content } />
		</TagName>
	);
}
