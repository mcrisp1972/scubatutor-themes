import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { stat, caption } = attributes;

	return (
		<div { ...useBlockProps() }>
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
				className="wp-block-capitola-stats-item__caption --micro-text"
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
