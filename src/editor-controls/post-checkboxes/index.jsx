import { useSelect } from '@wordpress/data';
import { BaseControl, useBaseControlProps, CheckboxControl, Flex } from '@wordpress/components';

export function PostCheckboxes( { label, value, onChange, postType, orderBy } ) {
	const { posts } = useSelect( ( select ) => {
		if ( ! orderBy ) {
			orderBy = 'title';
		}
		const order = orderBy === 'title' ? 'asc' : 'desc';
		return {
			posts: select( 'core' ).getEntityRecords( 'postType', postType, {
				per_page: -1,
				orderby: orderBy,
				order,
				_fields: 'id,title',
			} ),
		};
	} );

	const choices = [];

	if ( posts ) {
		posts.forEach( ( post ) => {
			choices.push( { value: post.id, label: post.title.raw } );
		} );
	}

	const { baseControlProps } = useBaseControlProps( {
		className: 'capitola-post-checkboxes',
		label,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<Flex direction="column">
				{ choices.map( ( i ) => {
					return (
						<CheckboxControl
							label={ i.label }
							checked={ value !== undefined && value.includes( i.value ) }
							key={ i.value }
							onChange={ ( checked ) => {
								value = value.filter( ( v ) => {
									return v !== i.value;
								} );
								if ( checked ) {
									value.push( i.value );
								}
								onChange( value );
							} }
							style={ { marginBottom: '0' } }
						/>
					);
				} ) }
			</Flex>
		</BaseControl>
	);
}
