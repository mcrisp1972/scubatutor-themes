<?php

$iframe_pattern = '/<iframe[^>]*>([\s\S]*?)<\/iframe>/i';

if ( ! preg_match( $iframe_pattern, $attributes['iframeHtml'] ) ) {
	$attributes['iframeHtml'] = 'HTML is not valid';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => '--' . $attributes['aspectRatio'] . ' align' . $attributes['align'],
	)
);

?>
<figure <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?= $attributes['iframeHtml'] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</figure>
