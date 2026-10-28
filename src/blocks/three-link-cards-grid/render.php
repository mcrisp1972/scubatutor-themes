<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$staggered_class = $attributes['staggered'] ? ' --staggered' : '';
$parallax_class  = $attributes['staggered'] && $attributes['parallax'] ? ' --parallax-scrolling js-threeCardParallax' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull' . $staggered_class . $parallax_class,
	)
);

?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-three-link-cards-grid__width">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
