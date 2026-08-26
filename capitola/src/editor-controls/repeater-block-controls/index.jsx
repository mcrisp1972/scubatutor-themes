import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import {
	chevronUp,
	chevronDown,
	chevronLeft,
	chevronRight,
	trash,
	plus,
	image,
} from '@wordpress/icons';

export function RepeaterBlockControls( {
	props,
	attribute,
	index,
	newValues,
	itemLabel = 'item',
	vertical = false,
	onImageChange = false,
	imageValue = false,
	onAddAfter = false,
	allowNull = false,
} ) {
	const mediaUploadOpenRef = useRef( null );

	// useEffect( () => {
	// 	const anchorEl = anchorRef.current;
	// 	if ( ! anchorEl?.parentElement ) {
	// 		return undefined;
	// 	}

	// 	const parentEl = anchorEl.parentElement;
	// 	const onMouseEnter = () => {
	// 		showToolbar();
	// 	};
	// 	const onMouseLeave = ( event ) => {
	// 		if ( isMediaModalOpen ) {
	// 			setIsParentHovered( false );
	// 			return;
	// 		}

	// 		const popoverEl = document.querySelector(
	// 			'.wp-block-capitola-small-image-slider__slide-toolbar-popover'
	// 		);
	// 		const nextTarget = event.relatedTarget;

	// 		if (
	// 			nextTarget &&
	// 			( parentEl.contains( nextTarget ) || popoverEl?.contains( nextTarget ) )
	// 		) {
	// 			return;
	// 		}

	// 		setIsParentHovered( false );
	// 		setIsToolbarHovered( false );
	// 	};

	// 	parentEl.addEventListener( 'mouseenter', onMouseEnter );
	// 	parentEl.addEventListener( 'mouseleave', onMouseLeave );

	// 	return () => {
	// 		parentEl.removeEventListener( 'mouseenter', onMouseEnter );
	// 		parentEl.removeEventListener( 'mouseleave', onMouseLeave );
	// 	};
	// }, [ isMediaModalOpen, showToolbar ] );

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

	const openImageModal = () => {
		// setIsMediaModalOpen( true );
		mediaUploadOpenRef.current?.();
	};

	function DeleteButton() {
		return (
			<ToolbarButton
				size="small"
				showTooltip={ true }
				label={ `Delete current ${ itemLabel }` }
				onClick={ () => {
					return removeRow( index );
				} }
				icon={ trash }
			/>
		);
	}

	function MoveBeforeButton() {
		return (
			<ToolbarButton
				size="small"
				showTooltip={ true }
				label={ `Move current ${ itemLabel } ${ vertical ? 'up' : 'left' }` }
				onClick={ () => {
					return moveBefore( index );
				} }
				icon={ vertical ? chevronUp : chevronLeft }
			/>
		);
	}

	function MoveAfterButton() {
		return (
			<ToolbarButton
				size="small"
				showTooltip={ true }
				label={ `Move current ${ itemLabel } ${ vertical ? 'down' : 'right' }` }
				onClick={ () => {
					return moveAfter( index );
				} }
				icon={ vertical ? chevronDown : chevronRight }
			/>
		);
	}

	function AddAfterButton() {
		return (
			<ToolbarButton
				size="small"
				showTooltip={ true }
				label={ `Add new ${ itemLabel }` }
				onClick={ () => {
					const rows = [ ...props.attributes[ attribute ] ];
					rows.splice( index + 1, 0, { ...newValues } );
					props.setAttributes( { [ attribute ]: rows } );
					if ( onAddAfter ) {
						onAddAfter();
					}
				} }
				icon={ plus }
			/>
		);
	}

	function ImageButton() {
		return (
			<ToolbarButton
				size="small"
				showTooltip={ true }
				label={ `Set current ${ itemLabel } image` }
				onClick={ openImageModal }
				icon={ image }
			/>
		);
	}

	return (
		<BlockControls>
			<ToolbarGroup>
				{ onImageChange && (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( value ) => {
								// setIsMediaModalOpen( false );
								onImageChange( value );
							} }
							onClose={ () => {
								// setIsMediaModalOpen( false );
							} }
							value={ imageValue }
							mode="browse"
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => {
								mediaUploadOpenRef.current = open;
								return null;
							} }
						/>
					</MediaUploadCheck>
				) }
				{ index !== 0 && <MoveBeforeButton /> }
				{ index !== props.attributes[ attribute ].length - 1 && <MoveAfterButton /> }
				<AddAfterButton />
				{ onImageChange ? <ImageButton /> : null }
				{ ( allowNull || props.attributes[ attribute ].length > 1 ) && <DeleteButton /> }
			</ToolbarGroup>
		</BlockControls>
	);
}
