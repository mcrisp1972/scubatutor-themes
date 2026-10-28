<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$animations = animation_attributes( $block->context );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => $animations['figure-class'],
		'style' => $animations['figure-styles'],
	)
);

?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wp-block-capitola-tabbed-contents-tabs__width ">
		<div class="wp-block-capitola-tabbed-contents-tabs__body">
			<div class="wp-block-capitola-tabbed-contents-tabs__tabs">
			<?php foreach ( $block->inner_blocks as $innerblock ) : ?>
				<button
					type="button"
					class="wp-block-capitola-tabbed-contents-tabs__tab"
					data-wp-context='<?php echo wp_json_encode( array( 'panelIndex' => $innerblock->attributes['pillLabel'] ) ); ?>'
					data-wp-class----is-selected="state.isSelected"
					data-wp-on--click="actions.togglePanel"
					>
						<?php echo esc_html( $innerblock->attributes['pillLabel'] ); ?>
				</button>
			<?php endforeach; ?>
			</div>
			<div class="wp-block-capitola-tabbed-contents-tabs__panels">
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		</div>
	</div>
</div>
