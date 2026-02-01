// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { Button, Icon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

function RepeaterControls( {
	props,
	attribute,
	index,
	newValues,
	vertical = false,
	onImageChange = false,
	imageValue = false,
	onAddAfter = false,
	allowNull = false,
	style = {},
} ) {
	const moveBefore = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( index - 1, index + 1 );
		rows.splice( index - 1, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const moveAfter = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( index, index + 2 );
		rows.splice( index, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const removeRow = ( index ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		rows.splice( index, 1 );
		props.setAttributes( { [ attribute ]: rows } );
	};

	function DeleteButton() {
		return (
			<Button
				className="capitola-repeater-controls__button --delete"
				title="Delete Row"
				onClick={ () => {
					return removeRow( index );
				} }
			>
				<Icon icon="trash" size="16px" />
			</Button>
		);
	}

	function MoveBeforeButton() {
		return (
			<Button
				className="capitola-repeater-controls__button --up"
				onClick={ () => {
					return moveBefore( index );
				} }
				title={ `Move ${ vertical ? 'Up' : 'Left' }` }
			>
				<Icon icon={ `arrow-${ vertical ? 'up' : 'left' }-alt2` } />
			</Button>
		);
	}

	function MoveAfterButton() {
		return (
			<Button
				className="capitola-repeater-controls__button --down"
				onClick={ () => {
					return moveAfter( index );
				} }
				title={ `Move ${ vertical ? 'Down' : 'Right' }` }
			>
				<Icon icon={ `arrow-${ vertical ? 'down' : 'right' }-alt2` } />
			</Button>
		);
	}

	function AddBeforeButton() {
		return (
			<Button
				className={ `capitola-repeater-controls__button --add-before ${ vertical ? '--vertical' : '' }` }
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
				} }
				title="Add Before"
			/>
		);
	}

	function AddAfterButton() {
		return (
			<Button
				className={ `capitola-repeater-controls__button --add-after ${ vertical ? '--vertical' : '' }` }
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index + 1, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
					if ( onAddAfter ) {
						onAddAfter();
					}
				} }
				title="Add After"
			/>
		);
	}

	function ImageButton() {
		return (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onImageChange }
					value={ imageValue }
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => {
						return (
							<Button
								className="capitola-repeater-controls__button --image"
								onClick={ open }
								title="Set Image"
							>
								<Icon icon="format-image" />
							</Button>
						);
					} }
				/>
			</MediaUploadCheck>
		);
	}

	return (
		<div className="capitola-repeater-controls" style={ style }>
			{ ( allowNull || props.attributes[ attribute ].length > 1 ) && <DeleteButton /> }
			{ index !== 0 && <MoveBeforeButton /> }
			{ index !== props.attributes[ attribute ].length - 1 && <MoveAfterButton /> }
			<AddBeforeButton />
			<AddAfterButton />
			{ onImageChange ? <ImageButton /> : null }
		</div>
	);
}

export default RepeaterControls;
