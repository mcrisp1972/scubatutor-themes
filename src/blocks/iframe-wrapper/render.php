<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$capitola_iframe_pattern = '/<iframe[^>]*>([\s\S]*?)<\/iframe>/i';

if ( ! preg_match( $capitola_iframe_pattern, $attributes['iframeHtml'] ) ) {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Core block attribute variable.
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
