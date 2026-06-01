import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { headline } = attributes;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-accordion-item__body-wrap',
		},
		{
			allowedBlocks: [
				'core/heading',
				'core/paragraph',
				'core/list',
				'core/buttons',
				'core/image',
				'core/video',
			],
		}
	);

	return (
		<div { ...blockProps }>
			<RichText
				className="wp-block-capitola-accordion-item__headline --hl-s"
				value={ headline }
				allowedFormats={ [] }
				placeholder="Headline..."
				onChange={ ( value ) => {
					setAttributes( { headline: value } );
				} }
			/>
			<div className="wp-block-capitola-accordion-item__body">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
