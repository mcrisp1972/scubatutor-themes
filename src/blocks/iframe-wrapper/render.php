<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$iframe_pattern = '/<iframe[^>]*>([\s\S]*?)<\/iframe>/i';

if ( ! preg_match( $iframe_pattern, $attributes['iframeHtml'] ) ) {
	$attributes['iframeHtml'] = 'HTML is not valid';
}

?>
<figure
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id'    => $attributes['anchor'],
			'class' => '--' . $attributes['aspectRatio'] . ' align' . $attributes['align'],
		)
	)
);
?>
>
	<?php echo $attributes['iframeHtml']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</figure>
