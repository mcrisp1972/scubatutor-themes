import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { IconSelector } from '../../editor-controls';
import icons from '../../../assets/svgs/icons/icons.json';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { icon, title, caption } = attributes;

	const themeObj = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen={ true }>
					<IconSelector
						label="Icon"
						value={ icon }
						onChange={ ( value ) => {
							setAttributes( { icon: value } );
						} }
						icons={ icons }
						iconPath="assets/svgs/icons"
					/>
				</PanelBody>
			</InspectorControls>
			<div className="wp-block-capitola-icon-item__icon-wrapper">
				<div
					className="wp-block-capitola-icon-item__icon"
					style={ {
						'--capitola-icon-image': `url(/wp-content/themes/${ themeObj?.stylesheet }/assets/svgs/icons/${ icon }.svg)`,
					} }
				></div>
			</div>
			<RichText
				className="wp-block-capitola-icon-item__title --hl-s"
				value={ title }
				allowedFormats={ [] }
				placeholder="Title..."
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
			/>
			<RichText
				tagName="p"
				className="wp-block-capitola-icon-item__caption --micro-text"
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
