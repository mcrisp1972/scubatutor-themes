<?php

namespace Capitola\Permalinks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the permalink settings field.
 *
 * @param array $args Settings field args.
 * @return void
 */
function permalink_settings_fields( $args ) {
	$permalinks = get_option( 'capitola-permalinks' );
	?>
	<?php wp_nonce_field( 'capitola_permalinks', 'capitola_permalinks_nonce' ); ?>
	<input name="capitola-permalinks[<?php echo esc_attr( $args['key'] ); ?>]" type="text" class="regular-text code" value="<?php echo esc_attr( $args['value'] ); ?>"/>
	<?php
}

/**
 * Saves permalink settings from the admin form.
 *
 * @return void
 */
function save_permalinks() {
	if ( ! isset( $_POST['capitola_permalinks_nonce'] ) ) {
		return;
	}

	$nonce = sanitize_text_field( wp_unslash( $_POST['capitola_permalinks_nonce'] ) );
	if ( ! wp_verify_nonce( $nonce, 'capitola_permalinks' ) ) {
		return;
	}

	$posted_permalinks = filter_input( INPUT_POST, 'capitola-permalinks', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
	if ( is_array( $posted_permalinks ) ) {
		$permalinks = array();
		foreach ( $posted_permalinks as $k => $v ) {
			$permalinks[ $k ] = sanitize_title( $v );
		}
		update_option( 'capitola-permalinks', $permalinks );
	}
}

add_action( 'admin_init', __NAMESPACE__ . '\save_permalinks' );

/**
 * Flushes rewrite rules when permalink settings change.
 *
 * @param mixed $old_value Previous option value.
 * @param mixed $new_value New option value.
 * @return void
 */
function flush_rewrites( $old_value, $new_value ) {
	if ( $old_value !== $new_value ) {
		flush_rewrite_rules();
	}
}

add_action( 'update_option_capitola-permalinks', __NAMESPACE__ . '\flush_rewrites', 10, 2 );

/**
 * Returns the permalink slug for a given key.
 *
 * @param string $key Permalink key.
 * @return string
 */
function get_slug( $key ) {
	$permalinks   = get_option( 'capitola-permalinks' );
	$default_slug = ! empty( $permalinks[ $key ] ) ? $permalinks[ $key ] : $key;

	if ( is_admin() ) {
		$posted_permalinks = filter_input( INPUT_POST, 'capitola-permalinks', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		if ( is_array( $posted_permalinks ) && ! empty( $posted_permalinks[ $key ] ) ) {
			$posted_slug = sanitize_title( $posted_permalinks[ $key ] );
			if ( $posted_slug !== $permalinks[ $key ] ) {
				return $posted_slug;
			}
		}
	}

	return $default_slug;
}
