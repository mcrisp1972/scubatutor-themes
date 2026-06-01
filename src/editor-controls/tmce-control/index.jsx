import { BaseControl, useBaseControlProps } from '@wordpress/components';
import { ClassicEdit } from './tmce';

export function TMCEControl( props ) {
	const { label, onChange, value } = props;

	const { baseControlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<BaseControl
			key={ baseControlProps.id }
			id={ baseControlProps.id }
			label={ label }
			className="capitola-tiny-mce-control"
		>
			<ClassicEdit content={ value } onChange={ onChange } editorId={ baseControlProps.id } />
		</BaseControl>
	);
}
