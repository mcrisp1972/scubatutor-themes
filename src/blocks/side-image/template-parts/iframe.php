<?php

use function Capitola\Blocks\Side_Image\is_valid_iframe;

if ( is_valid_iframe( $args['attributes']['iframeCode'] ) ) : ?>

	<div class="wp-block-capitola-side-image__iframe-wrap <?= esc_attr( $args['radius'] ); ?>" style="aspect-ratio: <?= esc_attr( \Capitola\Blocks\Side_Image\iframe_aspect_ratio( $args['attributes']['iframeCode'] ) ); ?>">
		<?= $args['attributes']['iframeCode']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<?php
endif;
