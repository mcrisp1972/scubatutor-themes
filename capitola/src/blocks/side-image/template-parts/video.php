<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<?php if ( 'local' === $args['attributes']['videoSource'] && $args['attributes']['videoObject']['id'] ) : ?>
	<video class="<?php echo esc_attr( $args['radius'] ); ?>" controls src="<?php echo esc_url( wp_get_attachment_url( $args['attributes']['videoObject']['id'] ) ); ?>" type="video/mp4"></video>
<?php elseif ( 'remote' === $args['attributes']['videoSource'] && $args['attributes']['videoUrl'] ) : ?>
	<video class="<?php echo esc_attr( $args['radius'] ); ?>" controls src="<?php echo esc_url( $args['attributes']['videoUrl'] ); ?>" type="video/mp4"></video>
<?php elseif ( 'youtube' === $args['attributes']['videoSource'] && $args['attributes']['videoID'] ) : ?>
	<div class="wp-block-capitola-side-image__iframe-wrap <?php echo esc_attr( $args['radius'] ); ?>" style="aspect-ratio: 560/315;">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo esc_attr( $args['attributes']['videoID'] ); ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
	</div>
<?php elseif ( 'vimeo' === $args['attributes']['videoSource'] && $args['attributes']['videoID'] ) : ?>
	<div class="wp-block-capitola-side-image__iframe-wrap <?php echo esc_attr( $args['radius'] ); ?>" style="aspect-ratio: 640/360;">
		<iframe src="https://player.vimeo.com/video/<?php echo esc_attr( $args['attributes']['videoID'] ); ?>" width="640" height="360" frameborder="0" allow="fullscreen" allowfullscreen loading="lazy"></iframe>
	</div>
	<?php
endif;
