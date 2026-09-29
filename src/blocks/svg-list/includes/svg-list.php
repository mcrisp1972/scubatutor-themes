<?php

namespace Capitola\Blocks\Svg_List;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * List SVGs in a directory.
 *
 * @param string $dir  Directory to scan.
 * @param array  $svgs Current SVGs.
 * @return array
 */
function list_svgs( $dir, $svgs = array() ) {

	$scan = scandir( CAPITOLA_THEME_DIR . DIRECTORY_SEPARATOR . $dir );
	foreach ( $scan as $file ) {
		if ( ! is_dir( CAPITOLA_THEME_DIR . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $file ) && str_ends_with( $file, '.svg' ) ) {
			$path     = remove_base_path( $dir . DIRECTORY_SEPARATOR . $file );
			$pathinfo = pathinfo( $path );

			if ( $pathinfo['dirname'] && '.' !== $pathinfo['dirname'] && '..' !== $pathinfo['dirname'] ) {
				$paths = explode( '/', $pathinfo['dirname'] );

				if ( count( $paths ) === 1 ) {
					$svgs[ $paths[0] ][] = $path;
				}
			} else {
				$svgs[] = $path;
			}
		} elseif ( is_dir( CAPITOLA_THEME_DIR . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $file ) && '.' !== $file && '..' !== $file ) {
			$svgs = list_svgs( $dir . DIRECTORY_SEPARATOR . $file, $svgs );
		}
	}
	return $svgs;
}

/**
 * Remove base path from SVG path.
 *
 * @param string $path SVG path.
 * @return string
 */
function remove_base_path( $path ) {
	$base_path = 'assets/svgs/';

	if ( substr( $path, 0, strlen( $base_path ) ) === $base_path ) {
		$path = substr( $path, strlen( $base_path ) );
	}
	return $path;
}
