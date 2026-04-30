<?php

/**
 * Disable WPForms default CSS by returning level 3 (no styles).
 *
 * @param mixed  $value The setting value.
 * @param string $key   The setting key.
 *
 * @return mixed
 */
function capitola_wpforms_disable_css( $value, $key ) {
	if ( 'disable-css' === $key ) {
		return 3;
	}
	return $value;
}

add_filter( 'wpforms_setting', 'capitola_wpforms_disable_css', 10, 2 );

/**
 * Remove the disable-css field from WPForms general settings form.
 *
 * @param array $defaults The default settings.
 *
 * @return array
 */
function capitola_wpforms_remove_disable_css_setting( $defaults ) {
	unset( $defaults['general']['disable-css'] );
	return $defaults;
}

add_filter( 'wpforms_settings_defaults', 'capitola_wpforms_remove_disable_css_setting', 10, 1 );
