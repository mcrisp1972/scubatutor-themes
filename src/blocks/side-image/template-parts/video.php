<?php if ( 'local' === $args['attributes']['videoSource'] && $args['attributes']['videoObject']['id'] ) : ?>
	<video class="<?= esc_attr( $args['radius'] ); ?>" controls src="<?= esc_url( wp_get_attachment_url( $args['attributes']['videoObject']['id'] ) ); ?>" type="video/mp4"></video>
<?php elseif ( 'remote' === $args['attributes']['videoSource'] && $args['attributes']['videoUrl'] ) : ?>
	<video class="<?= esc_attr( $args['radius'] ); ?>" controls src="<?= esc_url( $args['attributes']['videoUrl'] ); ?>" type="video/mp4"></video>
<?php elseif ( 'youtube' === $args['attributes']['videoSource'] && $args['attributes']['videoID'] ) : ?>
	<div class="wp-block-capitola-side-image__iframe-wrap <?= esc_attr( $args['radius'] ); ?>" style="aspect-ratio: 560/315;">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/<?= esc_attr( $args['attributes']['videoID'] ); ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
	</div>
<?php elseif ( 'vimeo' === $args['attributes']['videoSource'] && $args['attributes']['videoID'] ) : ?>
	<div class="wp-block-capitola-side-image__iframe-wrap <?= esc_attr( $args['radius'] ); ?>" style="aspect-ratio: 640/360;">
		<iframe src="https://player.vimeo.com/video/<?= esc_attr( $args['attributes']['videoID'] ); ?>" width="640" height="360" frameborder="0" allow="fullscreen" allowfullscreen loading="lazy"></iframe>
	</div>
	<?php
endif;
