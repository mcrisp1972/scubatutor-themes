<?php

$attributes = $args['attributes'];

if ( \cwps\sideImage\is_valid_iframe( $attributes['iframeCode'] ) ) : ?>

	<div class="wp-block-cwps-side-image__iframe-wrap <?= esc_attr( $args['radius'] ) ?>" style="aspect-ratio: <?= esc_attr( \cwps\sideImage\iframe_aspect_ratio( $attributes['iframeCode'] ) ) ?>">
		<?= $attributes['iframeCode'] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<?php
endif;
