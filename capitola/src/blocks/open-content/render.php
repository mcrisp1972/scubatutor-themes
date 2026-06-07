<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="wp-block-capitola-open-content__width alignwide is-layout-constrained">
		<div class="wp-block-capitola-open-content__content --justify-<?php echo esc_attr( $attributes['contentJustify'] ); ?> --align-<?php echo esc_attr( $attributes['textAlign'] ); ?>">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
</section>
