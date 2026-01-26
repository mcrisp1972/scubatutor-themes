// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Popover, TextControl, BaseControl, useBaseControlProps, Button } from '@wordpress/components';

function CtaControl( { className, onChange, value, placeholder } ) {
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isVisible, setIsVisible ] = useState( false );
	const [ titleValue, setTitleValue ] = useState( value?.title );
	const [ linkValue, setLinkValue ] = useState( value?.link ? value.link : null );
	const { baseControlProps, controlProps } = useBaseControlProps( { label: 'Link', __nextHasNoMarginBottom: true } );

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

	const displayTitle = value?.title ? value.title : value?.link?.title ? value.link.title : false;

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
				{ displayTitle ? displayTitle : placeholder ? placeholder : 'CTA...' }
			</div>
			{ isVisible && (
				<Popover anchor={ popoverAnchor } variant="toolbar" onClose={ toggleVisible }>
					<div className="cwps-cta-popover" style={ { padding: '16px' } }>
						<TextControl
							label="Button Text"
							className="cwps-cta-popover__title"
							value={ titleValue }
							onChange={ ( value ) => {
								setTitleValue( value );
								onChange( { link: linkValue, ...{ title: value } } );
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
								onChange={ ( value ) => {
									const previousUrl = linkValue?.url;
									if ( previousUrl && value?.url !== previousUrl ) {
										delete value.id;
										delete value.title;
										delete value.kind;
										delete value.type;
									}
									setLinkValue( value );
									onChange( { title: titleValue, link: value } );
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
