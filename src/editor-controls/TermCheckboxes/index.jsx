import { useSelect } from '@wordpress/data';
import { BaseControl, useBaseControlProps, CheckboxControl, Flex } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';

function TermCheckboxes( { label, value, onChange, taxonomy, orderBy } ) {
	const { terms } = useSelect( ( select ) => {
		if ( ! orderBy ) {
			orderBy = 'name';
		}
		const order = orderBy === 'name' ? 'asc' : 'desc';
		return {
			terms: select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, {
				per_page: -1,
				orderby: orderBy,
				order,
			} ),
		};
	} );

	const choices = [];

	if ( terms ) {
		terms.forEach( ( term ) => {
			choices.push( { value: term.id, label: term.name } );
		} );
	}

	const { baseControlProps } = useBaseControlProps( {
		className: 'capitola-term-checkboxes',
		label,
		__nextHasNoMarginBottom: true,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<Flex direction="column">
				{ choices.map( ( i ) => {
					return (
						<CheckboxControl
							label={ decodeEntities( i.label ) }
							checked={ value !== undefined && value.includes( i.value ) }
							key={ i.value }
							onChange={ ( checked ) => {
								value = value.filter( ( value ) => {
									return value !== i.value;
								} );
								if ( checked ) {
									value.push( i.value );
								}
								onChange( value );
							} }
							style={ { marginBottom: '0' } }
							__nextHasNoMarginBottom
						/>
					);
				} ) }
			</Flex>
		</BaseControl>
	);
}

export default TermCheckboxes;
