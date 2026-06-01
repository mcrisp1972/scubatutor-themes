import { CustomSelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export function IconSelector( { label, value, onChange, icons, iconPath } ) {
	const themeObj = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );

	const options = icons.map( ( icon ) => {
		return {
			name: icon.name,
			key: icon.slug,
			style: {
				paddingLeft: '28px',
				backgroundImage: icon.slug
					? `url(/wp-content/themes/${ themeObj?.stylesheet }/${ iconPath }/${ icon.slug }.svg)`
					: '',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '8px 50%',
				backgroundSize: '16px',
			},
		};
	} );

	return (
		<CustomSelectControl
			label={ label }
			value={ options.find( ( option ) => {
				return option.key === value;
			} ) }
			options={ [
				{
					name: 'None',
					key: '',
					style: {
						paddingLeft: '28px',
					},
				},
				...options,
			] }
			onChange={ ( newValue ) => {
				onChange( newValue.selectedItem.key );
			} }
		/>
	);
}
