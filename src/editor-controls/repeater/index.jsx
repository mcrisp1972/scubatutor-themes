import { PanelBody, BaseControl, useBaseControlProps, Button, Tip } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { chevronUp, chevronDown, trash, plus } from '@wordpress/icons';

export function repeaterOnChange( attribute, key, value, index, props ) {
	const rows = [ ...props.attributes[ attribute ] ];
	if ( key === false || key === null ) {
		rows[ index ] = value;
	} else {
		rows[ index ][ key ] = value;
	}
	props.setAttributes( { [ attribute ]: rows } );
}

export function Repeater( { props, label, pluralLabel, fields, attribute, newObject, help } ) {
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

	const addAfter = ( index ) => {
		let rows = [];
		if ( typeof newObject === 'object' ) {
			rows = [ ...props.attributes[ attribute ] ];
		} else if ( props.attributes[ attribute ] ) {
			rows = props.attributes[ attribute ];
		}
		rows.splice( index + 1, 0, { ...newObject } );
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
				{ index !== 0 && upButton( index ) }
				{ index !== props.attributes[ attribute ].length - 1 && downButton( index ) }
				{ addAfterButton( index ) }
				{ deleteButton( index ) }
			</div>
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

	const addAfterButton = ( index ) => {
		return (
			<Button
				size="small"
				onClick={ ( event ) => {
					const { ownerDocument } = event.target;
					addAfter( index );
					ownerDocument.activeElement?.blur();
				} }
				showTooltip={ true }
				label="Move Down"
				icon={ plus }
				__next40pxDefaultSize
			/>
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
