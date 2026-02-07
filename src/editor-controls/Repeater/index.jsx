import {
	PanelBody,
	BaseControl,
	useBaseControlProps,
	Button,
	Icon,
	Tip,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export function repeaterOnChange( attribute, key, value, index, props ) {
	const rows = [ ...props.attributes[ attribute ] ];
	if ( key === false || key === null ) {
		rows[ index ] = value;
	} else {
		rows[ index ][ key ] = value;
	}
	props.setAttributes( { [ attribute ]: rows } );
}

function Repeater( { props, label, pluralLabel, fields, attribute, newObject, help } ) {
	const addRow = () => {
		let rows = [];
		if ( typeof newObject === 'object' ) {
			rows = [ ...props.attributes[ attribute ] ];
		} else if ( props.attributes[ attribute ] ) {
			rows = props.attributes[ attribute ];
		}

		rows.push( newObject );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const removeRow = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		rows.splice( index, 1 );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const moveUp = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( index - 1, index + 1 );
		rows.splice( index - 1, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const moveDown = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( index, index + 2 );
		rows.splice( index, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const buttonRow = ( index ) => {
		return (
			<div className="capitola-repeater__button-row">
				{ deleteButton( index ) }
				{ index !== 0 && upButton( index ) }
				{ index !== props.attributes[ attribute ].length - 1 && downButton( index ) }
			</div>
		);
	};

	const deleteButton = ( index ) => {
		return (
			<Button
				className="capitola-repeater__button --delete"
				title="Delete Row"
				onClick={ () => {
					return removeRow( index );
				} }
			>
				<Icon icon="no-alt" size="16px" />
			</Button>
		);
	};

	const upButton = ( index ) => {
		return (
			<Button
				className="capitola-repeater__button --up"
				onClick={ () => {
					return moveUp( index );
				} }
				title="Move Up"
			>
				<Icon icon="arrow-up-alt2" />
			</Button>
		);
	};

	const downButton = ( index ) => {
		return (
			<Button
				className="capitola-repeater__button --down"
				onClick={ () => {
					return moveDown( index );
				} }
				title="Move Down"
			>
				<Icon icon="arrow-down-alt2" />
			</Button>
		);
	};

	const isFlat = typeof newObject !== 'object';

	let repeaterFields;

	if ( props && props.attributes[ attribute ] ) {
		repeaterFields = props.attributes[ attribute ].map( ( row, index ) => {
			return (
				<Fragment key={ index }>
					{ ! isFlat && (
						<PanelBody title={ label + ' ' + ( index + 1 ) } initialOpen={ true }>
							{ fields( index ) }
							{ buttonRow( index ) }
						</PanelBody>
					) }
					{ isFlat && (
						<>
							{ fields( index ) }
							{ buttonRow( index ) }
						</>
					) }
				</Fragment>
			);
		} );
	}

	const { baseControlProps } = useBaseControlProps( {
		label: pluralLabel,
		className: `capitola-repeater${ isFlat ? ' --flat' : '' }`,
		__nextHasNoMarginBottom: true,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			{ help && <Tip>{ help }</Tip> }
			<div className="capitola-repeater__inner-flex">{ repeaterFields }</div>
			<Button
				className="capitola-repeater__add-button"
				onClick={ addRow.bind( this ) }
				text={ `Add ${ label }` }
				variant="secondary"
			/>
		</BaseControl>
	);
}

export default Repeater;
