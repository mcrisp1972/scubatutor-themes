<?php

namespace cwps\loadAssets\adminForms;

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\admin_form_assets' );

function admin_form_assets() {

	wp_enqueue_style( 'cwps-admin-forms', CWPS_THEME_CSS_URL . 'admin-forms.css', array(), CWPS_THEME_VER );

	wp_register_script( 'cwps-admin-js', CWPS_THEME_JS_URL . 'admin-forms.js', array( 'media' ), CWPS_THEME_VER, true );
}
