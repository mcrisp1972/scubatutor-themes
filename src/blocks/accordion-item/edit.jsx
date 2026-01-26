import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { headline } = attributes;

	return (
		<div { ...useBlockProps() }>
			<RichText
				className="wp-block-cwps-accordion-item__headline --hl-s"
				value={ headline }
				allowedFormats={ [] }
				placeholder="Headline..."
				onChange={ ( value ) => {
					setAttributes( { headline: value } );
				} }
			/>
			<div className="wp-block-cwps-accordion-item__body">
				<div
					{ ...useInnerBlocksProps(
						{
							className: 'wp-block-cwps-accordion-item__body-wrap',
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
					) }
				/>
			</div>
		</div>
	);
}
