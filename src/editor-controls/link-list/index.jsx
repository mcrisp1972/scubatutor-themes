/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	Button,
	Popover,
	TextControl,
	BaseControl,
	useBaseControlProps,
	Icon,
	__experimentalConfirmDialog as ConfirmDialog,
} from '@wordpress/components';

function isCompleteLink( attr ) {
	return ( !! attr.title || !! attr.link.title ) && !! attr.link.url;
}

function LinkListItem( { linksObj, index, onUpdate, className } ) {
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isVisible, setIsVisible ] = useState( false );
	const [ showDelete, setShowDelete ] = useState( false );

	const { baseControlProps, controlProps } = useBaseControlProps( {
		label: 'Link',
	} );
	const toggleVisible = () => {
		setIsVisible( ( state ) => {
			return ! state;
		} );
	};
	const moveUp = ( i ) => {
		toggleVisible();
		const rows = [ ...linksObj ];
		const moved = rows.slice( i - 1, i + 1 );
		rows.splice( i - 1, 2, moved[ 1 ], moved[ 0 ] );
		onUpdate( rows );
	};

	const moveDown = ( i ) => {
		toggleVisible();
		const rows = [ ...linksObj ];
		const moved = rows.slice( i, i + 2 );
		rows.splice( i, 2, moved[ 1 ], moved[ 0 ] );
		onUpdate( rows );
	};

	const upButton = ( i ) => {
		return (
			<Button
				className="--hover-light"
				onClick={ () => {
					return moveUp( i );
				} }
				style={ {
					height: '16px',
					width: '16px',
					padding: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				} }
				title="Move Up"
			>
				<Icon
					icon="arrow-up-alt2"
					style={ { color: 'rgb(0, 124, 186)', cursor: 'pointer' } }
				/>
			</Button>
		);
	};

	const downButton = ( i ) => {
		return (
			<Button
				className="--hover-light"
				onClick={ () => {
					return moveDown( i );
				} }
				style={ {
					height: '16px',
					width: '16px',
					padding: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				} }
				title="Move Down"
			>
				<Icon
					icon="arrow-down-alt2"
					style={ { color: 'rgb(0, 124, 186)', cursor: 'pointer' } }
				/>
			</Button>
		);
	};

	return (
		<>
			<div
				ref={ setPopoverAnchor }
				className={ className }
				onClick={ toggleVisible }
				onKeyUp={ toggleVisible }
				role="button"
				key={ index }
				tabIndex={ 0 }
				style={
					isCompleteLink( linksObj[ index ] )
						? { cursor: 'pointer' }
						: { cursor: 'pointer', opacity: '.62' }
				}
			>
				{ ( () => {
					if ( linksObj[ index ].title ) {
						return linksObj[ index ].title;
					} else if ( linksObj[ index ].link && linksObj[ index ].link.title ) {
						return linksObj[ index ].link.title;
					}
					return 'Link...';
				} )() }
			</div>
			{ isVisible && (
				<Popover anchor={ popoverAnchor } variant="toolbar" onClose={ toggleVisible }>
					<div className="capitola-cta-popover" style={ { padding: '16px' } }>
						<TextControl
							label="Link Text"
							className="capitola-cta-popover__title"
							value={ linksObj[ index ].title }
							onChange={ ( value ) => {
								const newValue = [ ...linksObj ];
								newValue[ index ].title = value;
								onUpdate( newValue );
							} }
						/>
						<BaseControl { ...baseControlProps }>
							<LinkControl
								key={ 'link-' + controlProps.id }
								searchInputPlaceholder="Search..."
								value={ linksObj[ index ].link }
								settings={ [
									{
										id: 'opensInNewTab',
										title: 'New tab',
									},
								] }
								onChange={ ( value ) => {
									const newValue = [ ...linksObj ];
									if (
										newValue[ index ]?.link?.url &&
										value.url !== newValue[ index ].link.url
									) {
										delete value.id;
										delete value.title;
										delete value.kind;
										delete value.type;
									}
									newValue[ index ].link = value;
									onUpdate( newValue );
								} }
								withCreateSuggestion={ false }
								onRemove={ () => {
									const newValue = [ ...linksObj ];
									newValue[ index ].link = {};
									onUpdate( newValue );
								} }
							/>
						</BaseControl>
						<div
							style={ {
								display: 'flex',
								alignItems: 'center',
								gap: '16px',
							} }
						>
							{ index !== 0 && upButton( index ) }
							{ index !== linksObj.length - 1 && downButton( index ) }
							<Button
								className="--hover-light"
								style={ {
									height: '16px',
									width: '16px',
									padding: 0,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								} }
								title="Delete Link"
								onClick={ () => {
									setShowDelete( true );
								} }
							>
								<Icon
									icon="no-alt"
									size="16px"
									style={ {
										color: '#d43131',
										cursor: 'pointer',
									} }
								/>
							</Button>
							<Button
								variant="secondary"
								text="Close"
								onClick={ toggleVisible }
								style={ { marginLeft: 'auto' } }
							/>
							<ConfirmDialog
								isOpen={ showDelete }
								onConfirm={ () => {
									toggleVisible();
									setShowDelete( false );
									const links = [ ...linksObj ];
									links.splice( index, 1 );
									onUpdate( links );
								} }
								onCancel={ () => {
									setShowDelete( false );
								} }
							>
								Delete this link?
							</ConfirmDialog>
						</div>
					</div>
				</Popover>
			) }
		</>
	);
}

export function LinkList( { onChange, linkClass, value, disableAdd = false } ) {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ newTitle, setNewTitle ] = useState( '' );
	const [ newLink, setNewLink ] = useState( {} );
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const { baseControlProps, controlProps } = useBaseControlProps( {
		label: 'Link',
	} );
	const toggleVisible = () => {
		setIsVisible( ( state ) => {
			return ! state;
		} );
	};
	const handleAddLink = () => {
		onChange( [ ...value, { title: newTitle, link: newLink } ] );
		setNewTitle( '' );
		setNewLink( {} );
	};

	return (
		<>
			{ value.map( ( link, index ) => {
				return (
					<LinkListItem
						className={ linkClass }
						key={ index }
						linksObj={ value }
						index={ index }
						onUpdate={ onChange }
					/>
				);
			} ) }
			{ ! disableAdd && (
				<Button
					ref={ setPopoverAnchor }
					variant="link"
					onClick={ toggleVisible }
					style={ { marginTop: '8px' } }
				>
					+ Add Link
				</Button>
			) }
			{ isVisible && (
				<Popover anchor={ popoverAnchor } variant="toolbar" onClose={ toggleVisible }>
					<div className="capitola-cta-popover" style={ { padding: '16px' } }>
						<TextControl
							label="Link Text"
							className="capitola-cta-popover__title"
							value={ newTitle }
							onChange={ ( newValue ) => {
								setNewTitle( newValue );
							} }
						/>
						<BaseControl { ...baseControlProps }>
							<LinkControl
								key={ 'link-' + controlProps.id }
								searchInputPlaceholder="Search..."
								value={ newLink }
								settings={ [
									{
										id: 'opensInNewTab',
										title: 'New tab',
									},
								] }
								onChange={ ( newValue ) => {
									setNewLink( newValue );
								} }
								withCreateSuggestion={ false }
								onRemove={ () => {
									setNewLink( {} );
								} }
							/>
						</BaseControl>
						<div
							style={ {
								display: 'flex',
								justifyContent: 'space-between',
							} }
						>
							<Button
								variant="link"
								style={ {
									marginLeft: '8px',
									color: '#d61818',
								} }
								text="Cancel"
								onClick={ () => {
									toggleVisible();
								} }
							/>
							{ isCompleteLink( {
								title: newTitle,
								link: newLink,
							} ) && (
								<Button
									variant="primary"
									text="Add Link"
									onClick={ () => {
										toggleVisible();
										handleAddLink();
									} }
								/>
							) }
						</div>
					</div>
				</Popover>
			) }
		</>
	);
}
