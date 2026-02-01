<?php

$wrapper_attributes = get_block_wrapper_attributes();

?>

<div <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="wp-block-capitola-detailed-links-list__list">
		<?= wp_kses_post( $content ) ?>
	</div>
</div>
