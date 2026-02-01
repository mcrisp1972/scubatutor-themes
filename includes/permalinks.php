<?php

namespace Capitola\Permalinks;

// phpcs:ignoreFile WordPress.Security.NonceVerification.Missing

add_action( 'admin_init', __NAMESPACE__ . '\save_permalinks' );

add_action( 'update_option_cwps-permalinks', __NAMESPACE__ . '\flush_rewrites', 10, 2 );

function permalink_settings_fields( $args ) {
	$permalinks = get_option( 'cwps-permalinks' );
	?>
	<input name="cwps-permalinks[<?= $args['key'] ?>]" type="text" class="regular-text code" value="<?= $args['value'] ?>"/>
	<?php
}

function save_permalinks() {
	if ( isset( $_POST['cwps-permalinks'] ) ) {
		foreach ( $_POST['cwps-permalinks'] as $k => $v ) {
			$_POST['cwps-permalinks'][ $k ] = trim( $v );
		}
		update_option( 'cwps-permalinks', $_POST['cwps-permalinks'] );
	}
}

function flush_rewrites( $old_value, $new_value ) {
	if ( $old_value != $new_value ) {
		flush_rewrite_rules();
	}
}

function get_slug( $key ) {
	$permalinks = get_option( 'cwps-permalinks' );
	if ( is_admin() && ! empty( $_POST['cwps-permalinks'][ $key ] ) && sanitize_title( $_POST['cwps-permalinks'][ $key ] ) !== $permalinks[ $key ] ) {
		return sanitize_title( $_POST['cwps-permalinks'][ $key ] );
	} elseif ( ! empty( $permalinks[ $key ] ) ) {
		return $permalinks[ $key ];
	} else {
		return $key;
	}
}
