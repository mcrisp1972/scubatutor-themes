import { CustomSelectControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

export function IconSelector( { label, value, onChange, icons, iconPath } ) {
	const themeObj = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );

	let category = Object.keys( icons )[ 0 ];

	if ( value && value.includes( '/' ) ) {
		category = value?.split( '/' )[ 0 ];
	}

	const categories = Object.keys( icons );

	const [ selectedCategory, setSelectedCategory ] = useState( category );

	const options = icons[ selectedCategory ? selectedCategory : Object.keys( icons )[ 0 ] ].map(
		( icon ) => {
			return {
				name: icon.name,
				key: icon.slug,
				style: {
					'--icon': icon.slug
						? `url(/wp-content/themes/${ themeObj?.template }/${ iconPath }/${ selectedCategory }/${ icon.slug }.svg)`
						: '',
				},
				className: 'capitola-icon-selector__option',
			};
		}
	);

	return (
		<>
			<SelectControl
				label={ `${ label } Category` }
				value={ selectedCategory }
				options={ categories.map( ( c ) => {
					return {
						label: c.replaceAll( '-', ' ' ),
						value: c,
					};
				} ) }
				onChange={ ( newValue ) => {
					setSelectedCategory( newValue );
				} }
				className="capitola-icon-category-selector"
			/>
			<CustomSelectControl
				label={ label }
				value={ options.find( ( option ) => {
					return selectedCategory + '/' + option.key === value;
				} ) }
				className="capitola-icon-selector"
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
					onChange( `${ selectedCategory }/${ newValue.selectedItem.key }` );
				} }
			/>
		</>
	);
}
