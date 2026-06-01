import { PanelBody } from '@wordpress/components';
import { ColorThemePicker } from '../';

export function ColorThemePanel( { props, initialOpen } ) {
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
					help="Select a color theme for this block. This will apply the colors defined in the theme to this block."
				/>
			) }
		</PanelBody>
	);
}
