<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-three-link-cards__width alignwide --layout-<?php echo esc_attr( $attributes['introAlign'] ); ?> <?php echo esc_attr( $animations['block-class'] ); ?>" style="<?php echo $animations['block-styles']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</section>
