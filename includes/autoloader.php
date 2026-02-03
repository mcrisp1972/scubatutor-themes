<?php

namespace Capitola\Autoloader;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:ignoreFile WordPress.Security.ValidatedSanitizedInput.InputNotValidated

function autoloader( $class_name ) {
	if ( strpos( $class_name, 'WpScuba_' ) !== 0 ) {
		return;
	}

	$parts = explode( '_', $class_name );
	$file = 'class-';
	$file_path = CAPITOLA_THEME_DIR . '/inc/';

	if ( count( $parts ) === 2 ) {
		if ( is_dir( $file_path . $parts[1] . '/' ) ) {
			$file_path .= $parts[1] . '/';
		}
		$file .= $parts[1] . '.';
	} elseif ( count( $parts ) === 3 ) {
		$file_path .= $parts[1] . '/';
		$file .= $parts[1] . '-' . $parts[2] . '.';
	}

	$classfile = strtolower( $file_path . $file ) . 'php';
	$loadfile = null;

	if ( ! file_exists( $classfile ) ) {
		die( 'Class not loaded from file ' . $_SERVER['REQUEST_URI'] . ":\n" . $class_name . "\n" . $classfile );
	}

	if ( file_exists( $classfile ) ) {
		$loadfile = $classfile;
	} else {
		return;
	}
	if ( ! ( include_once $loadfile ) ) {
		die( 'Class not loaded from file ' . $_SERVER['REQUEST_URI'] . ":\n" . $class_name . "\n" . $file_path . $file . 'php' );
	}
}

spl_autoload_register( __NAMESPACE__ . '\autoloader' );
