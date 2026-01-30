import { InspectorControls, useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import { autop } from '@wordpress/autop';
import { useEffect, useState } from '@wordpress/element';
import { ColorThemePicker } from '../../../../crisp-base-theme/src/editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		showBusinessName,
		showAddress,
		showMapLink,
		showPhoneNumber,
		showEmail,
		showSocials,
		showHours,
		showCookieBanner,
		cookieBannerText,
		cookieBannerCloseText,
		cookieBannerTheme,
	} = attributes;
	const colorThemes = applyFilters( 'cwps.colorThemes' );

	const [ themeOptions, setThemeOptions ] = useState( null );
	const [ colorTheme, setColorTheme ] = useState( '' );
	const [ siteInfo, setSiteInfo ] = useState( null );
	const year = new Date().getFullYear();

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			const key = colorThemes.findIndex( ( color ) => {
				return color.slug === result.cwps_default_page_color_theme;
			} );
			if ( key !== -1 ) {
				setColorTheme( colorThemes[ key ].footerTheme );
			}
			setThemeOptions( result );
		} );
	}, [] );

	useEffect( () => {
		apiFetch( { path: '/' } ).then( ( result ) => {
			setSiteInfo( result );
		} );
	}, [] );

	return (
		<>
			<div
				{ ...useBlockProps( {
					className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
				} ) }
			>
				<InspectorControls>
					<PanelBody title="Nav Options" initialOpen={ true }>
						<ToggleControl
							label="Show Business Name"
							checked={ showBusinessName }
							onChange={ ( value ) => {
								setAttributes( { showBusinessName: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Address"
							checked={ showAddress }
							onChange={ ( value ) => {
								setAttributes( { showAddress: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Map Link"
							checked={ showMapLink }
							onChange={ ( value ) => {
								setAttributes( { showMapLink: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Phone Number"
							checked={ showPhoneNumber }
							onChange={ ( value ) => {
								setAttributes( { showPhoneNumber: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Email"
							checked={ showEmail }
							onChange={ ( value ) => {
								setAttributes( { showEmail: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Socials"
							checked={ showSocials }
							onChange={ ( value ) => {
								setAttributes( { showSocials: value } );
							} }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label="Show Hours"
							checked={ showHours }
							onChange={ ( value ) => {
								setAttributes( { showHours: value } );
							} }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
					<PanelBody title="Cookie Banner" initialOpen={ false }>
						<ToggleControl
							label="Show Cookie Banner"
							checked={ showCookieBanner }
							onChange={ ( value ) => {
								setAttributes( { showCookieBanner: value } );
							} }
							__nextHasNoMarginBottom
						/>
						{ showCookieBanner && (
							<ColorThemePicker
								label="Color Theme"
								value={ cookieBannerTheme }
								onChange={ ( value ) => {
									setAttributes( { cookieBannerTheme: value } );
								} }
							/>
						) }
					</PanelBody>
				</InspectorControls>
				<div className="wp-block-cwps-footer__grid alignwide">
					<div
						{ ...useInnerBlocksProps(
							{
								className: 'wp-block-cwps-footer__menus',
							},
							{
								defaultBlock: { name: 'cwps/footer-link-column' },
								allowedBlocks: [ 'cwps/footer-link-column' ],
								template: [ [ 'cwps/footer-link-column' ] ],
								orientation: 'horizontal',
								directInsert: true,
							}
						) }
					/>
					<div className="wp-block-cwps-footer__contact">
						<div className="wp-block-cwps-footer__contact-info">
							{ showBusinessName && themeOptions !== null && (
								<div>{ themeOptions.cwps_contact.business_name }</div>
							) }
							{ showAddress && themeOptions !== null && (
								<div
									dangerouslySetInnerHTML={ { __html: autop( themeOptions.cwps_contact.address ) } }
								/>
							) }
							{ showMapLink && (
								<div className="wp-block-cwps-footer__contact-link --map">Directions</div>
							) }
							{ showPhoneNumber && themeOptions !== null && (
								<div className="wp-block-cwps-footer__contact-link --phone">
									{ themeOptions.cwps_contact.phone }
								</div>
							) }
							{ showEmail && themeOptions !== null && (
								<div className="wp-block-cwps-footer__contact-link --email">
									{ themeOptions.cwps_contact.email }
								</div>
							) }
						</div>
						{ showHours && themeOptions !== null && (
							<div className="wp-block-cwps-footer__hours">
								{ Object.keys( themeOptions.cwps_hours ).map( ( key ) => {
									if ( themeOptions.cwps_hours[ key ] ) {
										return (
											<div key={ key }>
												<strong>{ key }: </strong>
												<span>
													{ themeOptions.cwps_hours[ key ]
														? themeOptions.cwps_hours[ key ]
														: 'Closed' }{ ' ' }
												</span>
											</div>
										);
									}
									return null;
								} ) }
							</div>
						) }
						{ showSocials && themeOptions !== null && (
							<div className="wp-block-cwps-footer__social-links">
								{ Object.keys( themeOptions.cwps_social_links ).map( ( key ) => {
									if ( themeOptions.cwps_social_links[ key ] ) {
										return (
											<div key={ key }>
												<span className={ `wp-block-cwps-footer__social-link --${ key }` } />
											</div>
										);
									}
									return null;
								} ) }
							</div>
						) }
					</div>
				</div>
				{ siteInfo !== null && (
					<div className="wp-block-cwps-footer__copyright">
						&copy;{ year }, <span dangerouslySetInnerHTML={ { __html: `${ siteInfo.name }` } } />
					</div>
				) }
			</div>
			{ showCookieBanner && (
				<div
					className={ `cwps-cookie-consent is-layout-constrained has-global-padding --theme-${ cookieBannerTheme }` }
				>
					<div className="cwps-cookie-consent__body alignwide">
						<RichText
							className="cwps-cookie-consent__notice"
							value={ cookieBannerText }
							placeholder="Message..."
							allowedFormats={ [ 'core/link' ] }
							onChange={ ( value ) => {
								setAttributes( { cookieBannerText: value } );
							} }
						/>
						<RichText
							className="cwps-cookie-consent__cta --cta"
							value={ cookieBannerCloseText }
							placeholder="Dismiss Text..."
							allowedFormats={ [] }
							onChange={ ( value ) => {
								setAttributes( { cookieBannerCloseText: value } );
							} }
						/>
					</div>
				</div>
			) }
		</>
	);
}
