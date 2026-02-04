<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$staggered_class = $attributes['staggered'] ? ' --staggered' : '';
$parallax_class  = $attributes['staggered'] && $attributes['parallax'] ? ' --parallax-scrolling js-threeCardParallax' : '';

?>

<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignfull' . $staggered_class . $parallax_class,
		)
	)
);
?>
>
	<div class="wp-block-capitola-three-link-cards-grid__width">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</div>
