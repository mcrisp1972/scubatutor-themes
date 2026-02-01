<?php

$attributes = $args['attributes'];

if ( \Capitola\Blocks\Side_Image\is_valid_iframe( $attributes['iframeCode'] ) ) : ?>

	<div class="wp-block-cwps-side-image__iframe-wrap <?= esc_attr( $args['radius'] ) ?>" style="aspect-ratio: <?= esc_attr( \Capitola\Blocks\Side_Image\iframe_aspect_ratio( $attributes['iframeCode'] ) ) ?>">
		<?= $attributes['iframeCode'] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<?php
endif;
