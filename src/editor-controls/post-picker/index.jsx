import { useSelect } from '@wordpress/data';
import { BaseControl, useBaseControlProps, ComboboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { debounce } from '@wordpress/compose';

function PostPicker( { label, value, onChange, postType, orderBy } ) {
	const [ fieldValue, setFieldValue ] = useState( false );

	const posts = useSelect(
		( select ) => {
			const query = {
				per_page: 100,
				orderby: orderBy ? orderBy : 'id',
				order: orderBy === 'title' ? 'asc' : 'desc',
				_fields: 'id,title',
			};

			if ( value ) {
				query.exclude = [ value ];
			}

			// Perform a search when the field is changed.
			if ( !! fieldValue ) {
				query.search = fieldValue;
			}

			return select( 'core' ).getEntityRecords( 'postType', postType, query );
		},
		[ fieldValue, orderBy, postType, value ]
	);

	const currentValue = useSelect(
		( select ) => {
			return value
				? select( 'core' ).getEntityRecords( 'postType', postType, {
						include: [ value ],
				  } )
				: null;
		},
		[ postType, value ]
	);

	const handleKeydown = ( inputValue ) => {
		setFieldValue( inputValue );
	};

	const choices = [];

	if ( !! posts ) {
		posts.forEach( ( post ) => {
			if ( post.title.raw ) {
				choices.push( { value: post.id, label: post.title.raw } );
			}
		} );
	}

	if ( currentValue ) {
		currentValue.forEach( ( post ) => {
			choices.push( { value: post.id, label: post.title.raw } );
		} );
	}

	if ( posts === null && currentValue === null ) {
		choices.push( { value: 0, label: 'Loading...' } );
	}

	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<div id={ controlProps.id }>
				<ComboboxControl
					className="test"
					options={ choices }
					value={ value }
					onChange={ onChange }
					onFilterValueChange={ debounce( handleKeydown, 300 ) }
					__next40pxDefaultSize
				/>
			</div>
		</BaseControl>
	);
}

export default PostPicker;
