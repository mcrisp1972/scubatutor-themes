import { BaseControl, useBaseControlProps } from '@wordpress/components';
import ClassicEdit from './tmce';

function TMCEControl( props ) {
	const { label, onChange, value } = props;

	const { baseControlProps } = useBaseControlProps( {
		label,
		__nextHasNoMarginBottom: true,
	} );

	return (
		<BaseControl
			key={ baseControlProps.id }
			id={ baseControlProps.id }
			label={ label }
			className="capitola-tiny-mce-control"
			__nextHasNoMarginBottom
		>
			<ClassicEdit content={ value } onChange={ onChange } editorId={ baseControlProps.id } />
		</BaseControl>
	);
}

export default TMCEControl;
