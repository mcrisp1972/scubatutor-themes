<?php

namespace Capitola\Blocks\Side_Image;

function is_valid_iframe( $iframe ) {
	return preg_match( '/<iframe[^>]*>([\s\S]*?)<\/iframe>/i', $iframe );
}

function iframe_aspect_ratio( $iframe ) {
	$iframe_aspect_ratio = 16 / 9;

	// Extract width and height to calculate aspect ratio
	preg_match( '/width=["\']?(\d+)["\']?/i', $iframe, $width_match );
	preg_match( '/height=["\']?(\d+)["\']?/i', $iframe, $height_match );

	if ( isset( $width_match[1] ) && isset( $height_match[1] ) ) {
		$iframe_width  = (int) $width_match[1];
		$iframe_height = (int) $height_match[1];
		$iframe_aspect_ratio = $iframe_width / $iframe_height;
	}
	return $iframe_aspect_ratio;
}
