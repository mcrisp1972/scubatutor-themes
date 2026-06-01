import { PanelBody, BaseControl, useBaseControlProps, Button, Tip } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { chevronUp, chevronDown, trash, plus } from '@wordpress/icons';

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

export function MetaRepeater( { postMeta, metaKey, label, pluralLabel, fields, newObject, help } ) {
	function getRowsForAdd( postMetaObject, postMetaKey, newRowObject ) {
		if ( typeof newRowObject === 'object' ) {
			return [ ...postMetaObject[ postMetaKey ] ];
		} else if ( postMetaObject[ postMetaKey ] ) {
			return postMetaObject[ postMetaKey ];
		}
		return [];
	}

	const addRow = () => {
		const rows = getRowsForAdd( postMeta, metaKey, newObject );
		rows.push( newObject );
		dispatch( 'core/editor' ).editPost( {
			meta: {
				refreshRepeater: Date.now(),
				[ metaKey ]: rows,
			},
		} );
	};

	const addRowAfter = ( index ) => {
		const rows = getRowsForAdd( postMeta, metaKey, newObject );
		rows.splice( index + 1, 0, newObject );
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
				{ index !== 0 && upButton( index ) }
				{ index !== postMeta[ metaKey ].length - 1 && downButton( index ) }
				{ addAfterButton( index ) }
				{ deleteButton( index ) }
			</div>
		);
	};

	const addAfterButton = ( index ) => {
		return (
			<Button
				size="small"
				onClick={ ( event ) => {
					const { ownerDocument } = event.target;
					addRowAfter( index );
					ownerDocument.activeElement?.blur();
				} }
				showTooltip={ true }
				label="Add After"
				icon={ plus }
				__next40pxDefaultSize
			/>
		);
	};

	const deleteButton = ( index ) => {
		return (
			<Button
				size="small"
				onClick={ ( event ) => {
					const { ownerDocument } = event.target;
					removeRow( index );
					ownerDocument.activeElement?.blur();
				} }
				showTooltip={ true }
				label="Delete Row"
				icon={ trash }
				__next40pxDefaultSize
			/>
		);
	};

	const upButton = ( index ) => {
		return (
			<Button
				size="small"
				onClick={ ( event ) => {
					const { ownerDocument } = event.target;
					moveUp( index );
					ownerDocument.activeElement?.blur();
				} }
				showTooltip={ true }
				label="Move Up"
				icon={ chevronUp }
				__next40pxDefaultSize
			/>
		);
	};

	const downButton = ( index ) => {
		return (
			<Button
				size="small"
				onClick={ ( event ) => {
					const { ownerDocument } = event.target;
					moveDown( index );
					ownerDocument.activeElement?.blur();
				} }
				showTooltip={ true }
				label="Move Down"
				icon={ chevronDown }
				__next40pxDefaultSize
			/>
		);
	};

	const isFlat = typeof newObject !== 'object';

	const { baseControlProps } = useBaseControlProps( {
		label: pluralLabel,
		className: `capitola-repeater${ isFlat ? ' --flat' : '' }`,
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
