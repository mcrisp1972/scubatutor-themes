<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $block->context );

?>
<div
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => $capitola_animations['figure-class'],
		)
	)
);
?>
<?php echo wp_kses_data( $capitola_animations['figure-data'] ); ?>>
	<div class="wp-block-capitola-tabbed-contents-tabs__width ">
		<div class="wp-block-capitola-tabbed-contents-tabs__body">
			<div class="wp-block-capitola-tabbed-contents-tabs__tabs">
			<?php foreach ( $block->inner_blocks as $capitola_innerblock ) : ?>
				<button
					type="button"
					class="wp-block-capitola-tabbed-contents-tabs__tab"
					data-wp-context='<?php echo wp_json_encode( array( 'panelIndex' => $capitola_innerblock->attributes['pillLabel'] ) ); ?>'
					data-wp-class----is-selected="state.isSelected"
					data-wp-on--click="actions.togglePanel"
					>
						<?php echo esc_html( $capitola_innerblock->attributes['pillLabel'] ); ?>
				</button>
			<?php endforeach; ?>
			</div>
			<div class="wp-block-capitola-tabbed-contents-tabs__panels">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>
	</div>
</div>
