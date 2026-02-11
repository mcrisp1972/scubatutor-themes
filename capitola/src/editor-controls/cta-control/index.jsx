import { LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	Popover,
	TextControl,
	BaseControl,
	useBaseControlProps,
	Button,
} from '@wordpress/components';

function getDisplayTitle( value ) {
	if ( value?.title ) {
		return value.title;
	} else if ( value?.link?.title ) {
		return value.link.title;
	}
	return false;
}

function CtaControl( { className, onChange, value, placeholder } ) {
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isVisible, setIsVisible ] = useState( false );
	const [ titleValue, setTitleValue ] = useState( value?.title );
	const [ linkValue, setLinkValue ] = useState( value?.link ? value.link : null );
	const { baseControlProps, controlProps } = useBaseControlProps( {
		label: 'Link',
		__nextHasNoMarginBottom: true,
	} );

	const [ shouldRebuild, setShouldRebuild ] = useState( value?.url );

	const toggleVisible = () => {
		setIsVisible( ( state ) => {
			return ! state;
		} );
	};

	if ( shouldRebuild ) {
		return (
			<Button
				variant="primary"
				text="Rebuild CTA Value"
				onClick={ () => {
					const newLinkObj = value;
					if ( !! newLinkObj.target ) {
						newLinkObj.opensInNewTab = newLinkObj.target === true;
						delete newLinkObj.target;
					} else if ( newLinkObj.target !== undefined ) {
						delete newLinkObj.target;
					}
					delete newLinkObj.title;
					delete newLinkObj.id;
					delete newLinkObj.type;
					delete newLinkObj.kind;
					setTitleValue( value.title );
					setLinkValue( newLinkObj );
					onChange( { title: titleValue, link: newLinkObj } );
					setShouldRebuild( false );
				} }
			/>
		);
	}

	const displayTitle = getDisplayTitle( value );

	return (
		<>
			<div
				ref={ setPopoverAnchor }
				className={ className }
				onClick={ toggleVisible }
				onKeyUp={ toggleVisible }
				role="button"
				tabIndex={ 0 }
				style={ displayTitle && !! linkValue?.url ? {} : { opacity: '.62' } }
			>
				{ ( () => {
					if ( displayTitle ) {
						return displayTitle;
					} else if ( placeholder ) {
						return placeholder;
					}
					return 'CTA...';
				} )() }
			</div>
			{ isVisible && (
				<Popover anchor={ popoverAnchor } variant="toolbar" onClose={ toggleVisible }>
					<div className="capitola-cta-popover" style={ { padding: '16px' } }>
						<TextControl
							label="Button Text"
							className="capitola-cta-popover__title"
							value={ titleValue }
							onChange={ ( newValue ) => {
								setTitleValue( newValue );
								onChange( { link: linkValue, ...{ title: newValue } } );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<BaseControl { ...baseControlProps }>
							<LinkControl
								key={ 'link-' + controlProps.id }
								searchInputPlaceholder="Search..."
								value={ linkValue }
								settings={ [
									{
										id: 'opensInNewTab',
										title: 'New tab',
									},
								] }
								onChange={ ( newValue ) => {
									const previousUrl = linkValue?.url;
									if ( previousUrl && newValue?.url !== previousUrl ) {
										delete newValue.id;
										delete newValue.title;
										delete newValue.kind;
										delete newValue.type;
									}
									setLinkValue( newValue );
									onChange( { title: titleValue, link: newValue } );
								} }
								withCreateSuggestion={ false }
								onRemove={ () => {
									setLinkValue( null );
									onChange( { title: titleValue } );
								} }
							/>
						</BaseControl>
						<Button variant="primary" text="Close" onClick={ toggleVisible } />
						{ !! value?.title && !! value?.title && (
							<Button
								variant="secondary"
								style={ { marginLeft: '8px' } }
								text="Delete Button"
								onClick={ () => {
									onChange( {} );
									setLinkValue( null );
									setTitleValue( '' );
									toggleVisible();
								} }
							/>
						) }
					</div>
				</Popover>
			) }
		</>
	);
}

export default CtaControl;
