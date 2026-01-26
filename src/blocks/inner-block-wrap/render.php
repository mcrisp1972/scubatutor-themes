<?php

$wrapper_attributes = get_block_wrapper_attributes();

?>

<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<?= wp_kses_post( $content ) ?>
</div>
