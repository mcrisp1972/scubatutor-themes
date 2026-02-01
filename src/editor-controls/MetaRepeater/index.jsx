import { PanelBody, BaseControl, useBaseControlProps, Button, Icon, Tip } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

export function MetaRepeaterOnChange( postMeta, metaKey, value, index, key ) {
	const rows = [ ...postMeta[ metaKey ] ];
	if ( key === undefined ) {
		rows[ index ] = value;
	} else {
		rows[ index ][ key ] = value;
	}
	dispatch( 'core/editor' ).editPost( {
		meta: {
			refreshRepeater: Date.now(),
			[ metaKey ]: rows,
		},
	} );
}

function MetaRepeater( { postMeta, metaKey, label, pluralLabel, fields, newObject, help } ) {
	const addRow = () => {
		const rows =
			typeof newObject === 'object' ? [ ...postMeta[ metaKey ] ] : postMeta[ metaKey ] ? postMeta[ metaKey ] : [];
		rows.push( newObject );
		dispatch( 'core/editor' ).editPost( {
			meta: {
				refreshRepeater: Date.now(),
				[ metaKey ]: rows,
			},
		} );
	};

	const removeRow = ( index ) => {
		const rows = [ ...postMeta[ metaKey ] ];
		rows.splice( index, 1 );
		dispatch( 'core/editor' ).editPost( {
			meta: {
				refreshRepeater: Date.now(),
				[ metaKey ]: rows,
			},
		} );
	};

	const moveUp = ( index ) => {
		const rows = [ ...postMeta[ metaKey ] ];
		const moved = rows.slice( index - 1, index + 1 );
		rows.splice( index - 1, 2, moved[ 1 ], moved[ 0 ] );
		dispatch( 'core/editor' ).editPost( {
			meta: {
				refreshRepeater: Date.now(),
				[ metaKey ]: rows,
			},
		} );
	};

	const moveDown = ( index ) => {
		const rows = [ ...postMeta[ metaKey ] ];
		const moved = rows.slice( index, index + 2 );
		rows.splice( index, 2, moved[ 1 ], moved[ 0 ] );
		dispatch( 'core/editor' ).editPost( {
			meta: {
				refreshRepeater: Date.now(),
				[ metaKey ]: rows,
			},
		} );
	};

	const buttonRow = ( index ) => {
		return (
			<div className="capitola-repeater__button-row">
				{ deleteButton( index ) }
				{ index !== 0 && upButton( index ) }
				{ index !== postMeta[ metaKey ].length - 1 && downButton( index ) }
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

	const { baseControlProps } = useBaseControlProps( {
		label: pluralLabel,
		className: `capitola-repeater${ isFlat ? ' --flat' : '' }`,
		__nextHasNoMarginBottom: true,
	} );

	let repeaterFields;

	if ( postMeta && postMeta[ metaKey ] ) {
		repeaterFields = postMeta[ metaKey ].map( ( row, index ) => {
			return (
				<Fragment key={ index }>
					{ ! isFlat && (
						<PanelBody title={ label + ' ' + ( index + 1 ) } initialOpen={ true }>
							<div className="capitola-repeater__field-wrap">
								{ fields( index ) }
								{ buttonRow( index ) }
							</div>
						</PanelBody>
					) }
					{ isFlat && (
						<div className="capitola-repeater__field-wrap">
							{ fields( index ) }
							{ buttonRow( index ) }
						</div>
					) }
				</Fragment>
			);
		} );
	}

	return (
		<BaseControl { ...baseControlProps }>
			<div className="capitola-repeater__main-flex">
				{ help && <Tip>{ help }</Tip> }
				<div className="capitola-repeater__inner-flex">{ repeaterFields }</div>
				<Button
					className="capitola-repeater__add-button"
					onClick={ addRow.bind( this ) }
					text={ `Add ${ label }` }
					variant="secondary"
				/>
			</div>
		</BaseControl>
	);
}

export default MetaRepeater;
