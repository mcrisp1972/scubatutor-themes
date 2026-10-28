<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// We do not escape content here, as it will break reCaptcha iframe scripts.

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
