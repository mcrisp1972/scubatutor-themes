<?php

namespace Capitola\Autoloader;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Autoloader function for Capitola classes.
 *
 * @param string $class_name The fully-qualified class name.
 */
function autoloader( $class_name ) {
	if ( strpos( $class_name, 'WpScuba_' ) !== 0 ) {
		return;
	}

	$parts     = explode( '_', $class_name );
	$file      = 'class-';
	$file_path = CAPITOLA_THEME_DIR . '/inc/';

	if ( count( $parts ) === 2 ) {
		if ( is_dir( $file_path . $parts[1] . '/' ) ) {
			$file_path .= $parts[1] . '/';
		}
		$file .= $parts[1] . '.';
	} elseif ( count( $parts ) === 3 ) {
		$file_path .= $parts[1] . '/';
		$file      .= $parts[1] . '-' . $parts[2] . '.';
	}

	$classfile       = strtolower( $file_path . $file ) . 'php';
	$loadfile        = null;
	$request_uri     = '';
	$raw_request_uri = filter_input( INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL );

	if ( ! empty( $raw_request_uri ) ) {
		$request_uri = $raw_request_uri;
	}

	if ( ! file_exists( $classfile ) ) {
		die( 'Class not loaded from file ' . esc_url( $request_uri ) . ":\n" . esc_html( $class_name ) . "\n" . esc_html( $classfile ) );
	}

	if ( file_exists( $classfile ) ) {
		$loadfile = $classfile;
	} else {
		return;
	}
	if ( ! ( include_once $loadfile ) ) {
		die( 'Class not loaded from file ' . esc_url( $request_uri ) . ":\n" . esc_html( $class_name ) . "\n" . esc_html( $file_path . $file . 'php' ) );
	}
}

spl_autoload_register( __NAMESPACE__ . '\autoloader' );
