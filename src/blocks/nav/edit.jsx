import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, ToggleControl, TextControl, RadioControl, RangeControl, Spinner } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { ImageSelect, LinkSelect, Repeater, repeaterOnChange } from '../../../../crisp-base-theme/src/editor-controls';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useState, useEffect } from '@wordpress/element';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		logo,
		useLogoColor,
		showAccountIcon,
		showCartIcon,
		showPhoneLink,
		utilityLinks,
		stickyStyle,
		dropdownSpeed,
		isExample,
	} = attributes;
	const colorThemes = applyFilters( 'cwps.colorThemes' );
	const [ themeOptions, setThemeOptions ] = useState( null );
	const [ colorTheme, setColorTheme ] = useState( '' );
	const [ wooActive, setWooActive ] = useState( null );

	const imageObject = useSelect(
		( select ) => {
			return logo ? select( 'core' ).getEntityRecord( 'postType', 'attachment', logo ) : undefined;
		},
		[ logo ]
	);

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: 'wp-block-cwps-nav__menu-items',
		},
		{
			defaultBlock: { name: 'cwps/nav-link' },
			template: [ [ 'cwps/nav-link' ] ],
			orientation: 'horizontal',
			allowedBlocks: [ 'cwps/nav-link', 'cwps/nav-dropdown', 'cwps/nav-mega-nav' ],
			directInsert: true,
		}
	);

	useEffect( () => {
		apiFetch( {
			path: addQueryArgs( '/wp/v2/plugins', { search: 'woocommerce/woocommerce', status: 'active' } ),
		} ).then( ( result ) => {
			setWooActive( result.length > 0 ? true : false );
		} );
	}, [] );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			const key = colorThemes.findIndex( ( color ) => {
				return color.slug === result.cwps_default_page_color_theme;
			} );
			if ( key !== -1 ) {
				setColorTheme( colorThemes[ key ].headerTheme );
			}
			setThemeOptions( result );
		} );
	}, [ colorThemes ] );

	return (
		<div
			{ ...useBlockProps( {
				className: 'alignfull',
				style: { '--cwps-dropdownSpeed': `${ dropdownSpeed }s` },
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Logo" initialOpen={ true }>
					<ImageSelect
						label="Nav Logo"
						value={ logo }
						onChange={ ( value ) => {
							setAttributes( { logo: value.id } );
						} }
					/>
					<ToggleControl
						label="Use Logo Colors"
						checked={ useLogoColor }
						onChange={ ( value ) => {
							setAttributes( { useLogoColor: value } );
						} }
						help="Retain the logo's colors."
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Animations" initialOpen={ true }>
					<RadioControl
						label="Sticky Style"
						selected={ stickyStyle }
						options={ [
							{ label: 'Shrink Utility', value: '--shrink-utility' },
							{ label: 'Reveal Down', value: '--reveal-down' },
						] }
						onChange={ ( value ) => {
							setAttributes( { stickyStyle: value } );
						} }
					/>
					<RangeControl
						label="Dropdown Speed"
						value={ dropdownSpeed }
						onChange={ ( value ) => {
							setAttributes( { dropdownSpeed: value } );
						} }
						withInputField={ false }
						min={ 0.0 }
						max={ 0.5 }
						step={ 0.1 }
						showTooltip={ true }
						help="Reveal speed in fractions of a second. Does not apply to mobile."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Utility Icon Links" initialOpen={ true }>
					{ wooActive === null ? (
						<Spinner />
					) : wooActive ? (
						<>
							<ToggleControl
								label="Show Account Link"
								checked={ showAccountIcon }
								onChange={ ( value ) => {
									setAttributes( { showAccountIcon: value } );
								} }
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label="Show Cart Link"
								checked={ showCartIcon }
								onChange={ ( value ) => {
									setAttributes( { showCartIcon: value } );
								} }
								help="Cart link only shows if there are itemns in the cart."
								__nextHasNoMarginBottom
							/>
						</>
					) : (
						<></>
					) }
					<ToggleControl
						label="Show Phone Link"
						checked={ showPhoneLink }
						onChange={ ( state ) => {
							setAttributes( { showPhoneLink: state } );
						} }
						help={
							themeOptions?.cwps_contact.phone
								? ''
								: 'Link will not appear unless you enter a contact phone number in the theme options.'
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Utility Links" initialOpen={ false }>
					<Repeater
						props={ props }
						attribute="utilityLinks"
						label="Link"
						pluralLabel="Links"
						newObject={ {
							title: '',
							link: {},
						} }
						fields={ ( index ) => {
							const attribute = 'utilityLinks';
							return [
								<TextControl
									key="title"
									label="Link Text"
									value={ props.attributes.utilityLinks[ index ].title }
									onChange={ ( value ) => {
										repeaterOnChange( attribute, 'title', value, index, props );
									} }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>,
								<LinkSelect
									key="link"
									label="Link"
									value={ props.attributes.utilityLinks[ index ].link }
									onChange={ ( value ) => {
										repeaterOnChange( attribute, 'link', value, index, props );
									} }
									onRemove={ () => {
										repeaterOnChange( attribute, 'link', {}, index, props );
									} }
								/>,
							];
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<nav
				className={ `wp-block-cwps-nav__background is-layout-constrained has-global-padding --theme-${ colorTheme }` }
			>
				<div className="wp-block-cwps-nav__grid alignwide">
					{ imageObject !== undefined &&
						imageObject.mime_type.startsWith( 'image/svg' ) &&
						! useLogoColor && (
							<div
								className="wp-block-cwps-nav__logo --has-svg-mask"
								style={ {
									aspectRatio:
										imageObject.media_details.width + '/' + imageObject.media_details.height,
									maskImage: 'url(' + imageObject.source_url + ')',
									WebkitMaskImage: 'url(' + imageObject.source_url + ')',
								} }
							>
								<img src={ imageObject.source_url } className="custom-logo" alt="" />
							</div>
						) }
					{ imageObject !== undefined && useLogoColor && (
						<div className="wp-block-cwps-nav__logo">
							<img src={ imageObject.source_url } className="custom-logo" alt="" />
						</div>
					) }
					{ ( isExample || ! logo ) && <div className="wp-block-cwps-nav__logo" /> }
					<div className="wp-block-cwps-nav__menu">
						<ul className="wp-block-cwps-nav__utility-menu">
							{ utilityLinks.map( ( item, index ) => {
								return (
									<li key={ index } className="wp-block-cwps-nav__utility-menu-item">
										<div className="wp-block-cwps-nav__utility-menu-item-link">{ item.title }</div>
									</li>
								);
							} ) }
							{ wooActive && showAccountIcon && (
								<li className="wp-block-cwps-nav__utility-menu-item">
									<div className="wp-block-cwps-nav__utility-menu-item-link --account">Account</div>
								</li>
							) }
							{ wooActive && showCartIcon && (
								<li className="wp-block-cwps-nav__utility-menu-item">
									<div className="wp-block-cwps-nav__utility-menu-item-link --cart">Cart</div>
								</li>
							) }
							{ showPhoneLink && themeOptions?.cwps_contact.phone && (
								<li className="wp-block-cwps-nav__utility-menu-item">
									<div className="wp-block-cwps-nav__utility-menu-item-link --phone">
										{ themeOptions.cwps_contact.phone }
									</div>
								</li>
							) }
						</ul>
						<div { ...innerBlocksProps }>
							{ children }
							<div className="wp-block-cwps-nav__search-trigger" />
						</div>
					</div>
					<button className="wp-block-cwps-nav__hamburger" type="button">
						<div className="burger-line"></div>
						<div className="burger-line"></div>
						<div className="burger-line"></div>
					</button>
				</div>
			</nav>
		</div>
	);
}
