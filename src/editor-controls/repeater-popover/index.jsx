import { Button, Icon, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { tool } from '@wordpress/icons';

function RepeaterPopover( {
	props,
	attribute,
	index,
	newValues,
	fullButton = false,
	vertical = false,
	onImageChange = false,
	imageValue = false,
	onAddAfter = false,
	allowNull = false,
	style = {},
	children = null,
} ) {
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isMediaModalOpen, setIsMediaModalOpen ] = useState( false );

	const toggleVisible = () => {
		setIsVisible( ( state ) => {
			return ! state;
		} );
	};

	const moveBefore = ( i ) => {
		const rows = [ ...props.attributes[ attribute ] ];
		const moved = rows.slice( i - 1, i + 1 );
		rows.splice( i - 1, 2, moved[ 1 ], moved[ 0 ] );
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
				className="capitola-repeater-popover__toolbar-button --delete"
				title="Delete Row"
				onClick={ () => {
					removeRow( index );
					toggleVisible();
				} }
			>
				<Icon icon="trash" size="16px" />
			</Button>
		);
	}

	function MoveBeforeButton() {
		return (
			<Button
				className="capitola-repeater-popover__toolbar-button --up"
				onClick={ () => {
					moveBefore( index );
					toggleVisible();
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
				className="capitola-repeater-popover__toolbar-button --down"
				onClick={ () => {
					moveAfter( index );
					toggleVisible();
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
				className={ `capitola-repeater-popover__toolbar-button --add-before ${
					vertical ? '--vertical' : ''
				}` }
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
					toggleVisible();
				} }
				title="Add Before"
			/>
		);
	}

	function AddAfterButton() {
		return (
			<Button
				className={ `capitola-repeater-popover__toolbar-button --add-after ${
					vertical ? '--vertical' : ''
				}` }
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index + 1, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
					if ( onAddAfter ) {
						onAddAfter();
					}
					toggleVisible();
				} }
				title="Add After"
			/>
		);
	}

	// using a REACT component is breaking media library
	const imageButton = () => {
		return (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( value ) => {
						setIsMediaModalOpen( false );
						if ( onImageChange ) {
							onImageChange( value );
						}
					} }
					onClose={ () => {
						setIsMediaModalOpen( false );
					} }
					value={ imageValue }
					mode="browse"
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => {
						return (
							<Button
								className="capitola-repeater-popover__toolbar-button --image"
								onClick={ () => {
									setIsMediaModalOpen( true );
									open();
								} }
								title="Set Image"
							>
								<Icon icon="format-image" />
							</Button>
						);
					} }
				/>
			</MediaUploadCheck>
		);
	};

	return (
		<>
			<div
				className={ `capitola-repeater-popover__trigger ${
					fullButton ? '--full-button' : ''
				}` }
				role="button"
				tabIndex={ 0 }
				ref={ setPopoverAnchor }
				onClick={ toggleVisible }
				onKeyUp={ toggleVisible }
			>
				<Icon icon={ tool } />
			</div>
			{ isVisible && (
				<Popover
					anchor={ popoverAnchor }
					focusOnMount={ true } // setting this to false, or leaving at default value prevents click-off from closing the popover.
					variant="toolbar"
					placement={ fullButton ? 'top-start' : 'top-end' }
					className={
						isMediaModalOpen
							? 'capitola-repeater-popover --media-modal-open'
							: 'capitola-repeater-popover'
					}
					onClose={ () => {
						if ( ! isMediaModalOpen ) {
							toggleVisible();
						}
					} }
				>
					<div className="capitola-repeater-popover__toolbar" style={ style }>
						{ ( allowNull || props.attributes[ attribute ].length > 1 ) && (
							<DeleteButton />
						) }
						{ index !== 0 && <MoveBeforeButton /> }
						{ index !== props.attributes[ attribute ].length - 1 && (
							<MoveAfterButton />
						) }
						<AddBeforeButton />
						<AddAfterButton />
						{ onImageChange ? imageButton( index ) : null }
					</div>
					{ children && (
						<div className="capitola-repeater-popover__fields">
							{ children }
							<Button
								variant="primary"
								onClick={ toggleVisible }
								style={ { alignSelf: 'flex-start' } }
							>
								Close
							</Button>
						</div>
					) }
				</Popover>
			) }
		</>
	);
}

export default RepeaterPopover;
