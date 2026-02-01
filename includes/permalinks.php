<?php

namespace Capitola\Permalinks;

// phpcs:ignoreFile WordPress.Security.NonceVerification.Missing

add_action( 'admin_init', __NAMESPACE__ . '\save_permalinks' );

add_action( 'update_option_capitola-permalinks', __NAMESPACE__ . '\flush_rewrites', 10, 2 );

function permalink_settings_fields( $args ) {
	$permalinks = get_option( 'capitola-permalinks' );
	?>
	<input name="capitola-permalinks[<?= $args['key'] ?>]" type="text" class="regular-text code" value="<?= $args['value'] ?>"/>
	<?php
}

function save_permalinks() {
	if ( isset( $_POST['capitola-permalinks'] ) ) {
		foreach ( $_POST['capitola-permalinks'] as $k => $v ) {
			$_POST['capitola-permalinks'][ $k ] = trim( $v );
		}
		update_option( 'capitola-permalinks', $_POST['capitola-permalinks'] );
	}
}

function flush_rewrites( $old_value, $new_value ) {
	if ( $old_value != $new_value ) {
		flush_rewrite_rules();
	}
}

function get_slug( $key ) {
	$permalinks = get_option( 'capitola-permalinks' );
	if ( is_admin() && ! empty( $_POST['capitola-permalinks'][ $key ] ) && sanitize_title( $_POST['capitola-permalinks'][ $key ] ) !== $permalinks[ $key ] ) {
		return sanitize_title( $_POST['capitola-permalinks'][ $key ] );
	} elseif ( ! empty( $permalinks[ $key ] ) ) {
		return $permalinks[ $key ];
	} else {
		return $key;
	}
}
