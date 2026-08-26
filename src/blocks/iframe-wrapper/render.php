<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$iframe_pattern = '/<iframe[^>]*>([\s\S]*?)<\/iframe>/i';

if ( ! preg_match( $iframe_pattern, $attributes['iframeHtml'] ) ) {
	$attributes['iframeHtml'] = 'HTML is not valid';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'align' . $attributes['align'],
		'style' => 'border-radius: var(--wp--preset--border-radius--' . $attributes['radius'] . '); aspect-ratio: var(--wp--preset--aspect-ratio--' . $attributes['aspectRatio'] . ');',
	)
);

?>
<figure <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<?php echo $attributes['iframeHtml']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</figure>
