import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	chevronUp,
	chevronDown,
	chevronLeft,
	chevronRight,
	trash,
	plus,
	image,
} from '@wordpress/icons';

export function RepeaterControls( {
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
	const moveBefore = ( i ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( i - 1, i + 1 );
		rows.splice( index - 1, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const moveAfter = ( i ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( i, i + 2 );
		rows.splice( i, 2, moved[ 1 ], moved[ 0 ] );
		props.setAttributes( { [ attribute ]: rows } );
	};

	const removeRow = ( i ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		rows.splice( i, 1 );
		props.setAttributes( { [ attribute ]: rows } );
	};

	function DeleteButton() {
		return (
			<Button
				size="small"
				showTooltip={ true }
				label="Delete Item"
				onClick={ () => {
					return removeRow( index );
				} }
				icon={ trash }
				__next40pxDefaultSize
			/>
		);
	}

	function MoveBeforeButton() {
		return (
			<Button
				size="small"
				showTooltip={ true }
				label={ `Move ${ vertical ? 'Up' : 'Left' }` }
				onClick={ () => {
					return moveBefore( index );
				} }
				icon={ vertical ? chevronUp : chevronLeft }
				__next40pxDefaultSize
			/>
		);
	}

	function MoveAfterButton() {
		return (
			<Button
				size="small"
				showTooltip={ true }
				label={ `Move ${ vertical ? 'Down' : 'Right' }` }
				onClick={ () => {
					return moveAfter( index );
				} }
				icon={ vertical ? chevronDown : chevronRight }
				__next40pxDefaultSize
			/>
		);
	}

	function AddAfterButton() {
		return (
			<Button
				size="small"
				showTooltip={ true }
				label="Add After"
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index + 1, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
					if ( onAddAfter ) {
						onAddAfter();
					}
				} }
				icon={ plus }
				__next40pxDefaultSize
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
								size="small"
								showTooltip={ true }
								label="Set Image"
								onClick={ open }
								icon={ image }
								__next40pxDefaultSize
							/>
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
			<AddAfterButton />
			{ onImageChange ? <ImageButton /> : null }
		</div>
	);
}
