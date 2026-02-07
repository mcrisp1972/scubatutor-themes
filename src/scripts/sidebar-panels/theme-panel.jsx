import { dispatch, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { ToggleControl, Flex } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { ColorThemePicker } from '../../editor-controls';

export default function ThemePanels() {
	const postType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	const meta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	}, [] );

	const [ defaultPageTheme, setDefaultPageTheme ] = useState( '' );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			setDefaultPageTheme( result.capitola_default_page_color_theme );
		} );
	}, [] );

	if ( ! postType ) {
		return null;
	}

	const changeTheme = ( theme ) => {
		const editorBody = document.querySelector( '.editor-styles-wrapper' );
		if ( frames[ 'editor-canvas' ] !== undefined ) {
			frames[ 'editor-canvas' ].window.document.body.dataset.theme = theme;
		} else if ( editorBody ) {
			editorBody.dataset.theme = theme;
		}
	};

	const theme = !! meta && ! meta?.useDefColorTheme ? meta.pageColorTheme : defaultPageTheme;

	if ( theme ) {
		changeTheme( theme );
	}

	return (
		<PluginDocumentSettingPanel name="capitola-sidebar-theme" title={ 'Color Options' }>
			<Flex direction="column" gap="16px">
				<ToggleControl
					label="Use Default Page Color Theme"
					checked={ meta?.useDefColorTheme }
					onChange={ ( value ) => {
						const newMeta = { useDefColorTheme: value };
						if ( value ) {
							newMeta.pageColorTheme = '';
							changeTheme( defaultPageTheme );
						}
						dispatch( 'core/editor' ).editPost( {
							meta: newMeta,
						} );
					} }
					__nextHasNoMarginBottom
				/>
				{ ! meta?.useDefColorTheme && (
					<ColorThemePicker
						label="Page Color Theme"
						value={ !! meta?.pageColorTheme ? meta.pageColorTheme : defaultPageTheme }
						onChange={ ( value ) => {
							changeTheme( value );
							dispatch( 'core/editor' ).editPost( {
								meta: {
									pageColorTheme: value,
								},
							} );
						} }
					/>
				) }
			</Flex>
		</PluginDocumentSettingPanel>
	);
}
