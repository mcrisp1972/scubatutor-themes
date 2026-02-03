<?php

namespace Capitola\Load_Assets\Admin_Forms;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\admin_form_assets' );

/**
 * Enqueues assets for admin forms.
 *
 * @return void
 */
function admin_form_assets() {
	wp_enqueue_style( 'capitola-admin-forms', CAPITOLA_CSS_URL . 'admin-forms.css', array(), CAPITOLA_THEME_VER );
	wp_register_script( 'capitola-admin-js', CAPITOLA_JS_URL . 'admin-forms.js', array( 'media' ), CAPITOLA_THEME_VER, true );
}
