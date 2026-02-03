<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$capitola_staggered_class = $attributes['staggered'] ? ' --staggered' : '';
$capitola_parallax_class  = $attributes['staggered'] && $attributes['parallax'] ? ' --parallax-scrolling js-threeCardParallax' : '';

?>

<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignfull' . $capitola_staggered_class . $capitola_parallax_class,
		)
	)
);
?>
>
	<div class="wp-block-capitola-three-link-cards-grid__width">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</div>
