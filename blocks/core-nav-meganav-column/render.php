<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-capitola-core-nav-meganav-column',
	)
);

?>

<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-core-nav-meganav-column__inner">
		TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
		<?php
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- core/navigation render or saved inner blocks HTML.
		echo $content;
		?>
	</div>
</div>
