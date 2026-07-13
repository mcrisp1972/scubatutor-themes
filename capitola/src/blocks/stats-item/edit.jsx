import { useBlockProps, RichText } from '@wordpress/block-editor';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { stat, caption } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<RichText
				className="wp-block-capitola-stats-item__stat --hl-xl"
				value={ stat }
				allowedFormats={ [] }
				placeholder="Stat..."
				onChange={ ( value ) => {
					setAttributes( { stat: value } );
				} }
			/>
			<RichText
				tagName="p"
				className="wp-block-capitola-stats-item__caption --text-s"
				value={ caption }
				allowedFormats={ [] }
				placeholder="Caption..."
				onChange={ ( value ) => {
					setAttributes( { caption: value } );
				} }
			/>
		</div>
	);
}
