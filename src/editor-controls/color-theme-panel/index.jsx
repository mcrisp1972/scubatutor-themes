import { PanelBody } from '@wordpress/components';
import { ColorThemePicker } from '../';

function ColorThemePanel( { props, initialOpen } ) {
	const { attributes, setAttributes } = props;

	const { colorTheme } = attributes;

	return (
		<PanelBody title="Theme" initialOpen={ initialOpen ? true : false }>
			{ props.attributes.hasOwnProperty( 'colorTheme' ) && (
				<ColorThemePicker
					label="Block Color Theme"
					value={ !! colorTheme ? colorTheme : '' }
					onChange={ ( value ) => {
						return setAttributes( { colorTheme: value } );
					} }
				/>
			) }
		</PanelBody>
	);
}

export default ColorThemePanel;
