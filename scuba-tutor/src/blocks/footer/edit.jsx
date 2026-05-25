import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { ColorThemePicker } from '../../../../capitola/src/editor-controls';
import colorThemes from '../../../color-themes.json';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const {
		showBusinessName,
		showSocials,
		showCookieBanner,
		cookieBannerText,
		cookieBannerCloseText,
		cookieBannerTheme,
	} = attributes;

	const [ themeOptions, setThemeOptions ] = useState( null );
	const [ colorTheme, setColorTheme ] = useState( '' );
	const [ siteInfo, setSiteInfo ] = useState( null );
	const year = new Date().getFullYear();

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			const key = colorThemes.findIndex( ( color ) => {
				return color.slug === result.capitola_default_page_color_theme;
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
								return setAttributes( { showBusinessName: value } );
							} }
						/>
						<ToggleControl
							label="Show Socials"
							checked={ showSocials }
							onChange={ ( value ) => {
								return setAttributes( { showSocials: value } );
							} }
						/>
					</PanelBody>
					<PanelBody title="Cookie Banner" initialOpen={ true }>
						<ToggleControl
							label="Show Cookie Banner"
							checked={ showCookieBanner }
							onChange={ ( value ) => {
								setAttributes( { showCookieBanner: value } );
							} }
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
				<div className="wp-block-capitola-footer__grid alignwide">
					<div
						{ ...useInnerBlocksProps(
							{
								className: 'wp-block-capitola-footer__menus',
							},
							{
								defaultBlock: { name: 'capitola/footer-link-column' },
								allowedBlocks: [ 'capitola/footer-link-column' ],
								template: [ [ 'capitola/footer-link-column' ] ],
								orientation: 'horizontal',
								directInsert: true,
							}
						) }
					/>
					<div className="wp-block-capitola-footer__contact">
						<div className="wp-block-capitola-footer__contact-info">
							{ showBusinessName && themeOptions !== null && (
								<div>{ themeOptions.capitola_contact.business_name }</div>
							) }
						</div>
						{ showSocials && themeOptions !== null && (
							<div className="wp-block-capitola-footer__social-links">
								{ Object.keys( themeOptions.capitola_social_links ).map(
									( key ) => {
										if ( themeOptions.capitola_social_links[ key ] ) {
											return (
												<div key={ key }>
													<span
														className={ `wp-block-capitola-footer__social-link --${ key }` }
													/>
												</div>
											);
										}
										return null;
									}
								) }
							</div>
						) }
					</div>
				</div>
				{ siteInfo !== null && (
					<div className="wp-block-capitola-footer__copyright">
						&copy;{ year },{ ' ' }
						<span dangerouslySetInnerHTML={ { __html: `${ siteInfo.name }` } } />
					</div>
				) }
			</div>
			{ showCookieBanner && (
				<div
					className={ `capitola-cookie-consent is-layout-constrained has-global-padding --theme-${ cookieBannerTheme }` }
				>
					<div className="capitola-cookie-consent__body alignwide">
						<RichText
							className="capitola-cookie-consent__notice"
							value={ cookieBannerText }
							placeholder="Message..."
							allowedFormats={ [ 'core/link' ] }
							onChange={ ( value ) => {
								return setAttributes( { cookieBannerText: value } );
							} }
						/>
						<RichText
							className="capitola-cookie-consent__cta --cta"
							value={ cookieBannerCloseText }
							placeholder="Dismiss Text..."
							allowedFormats={ [] }
							onChange={ ( value ) => {
								return setAttributes( { cookieBannerCloseText: value } );
							} }
						/>
					</div>
				</div>
			) }
		</>
	);
}
