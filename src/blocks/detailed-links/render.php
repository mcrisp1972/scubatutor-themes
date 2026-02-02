<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $attributes );

?>
<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
			'style' => '--capitola-excerpt-lines: ' . $attributes['excerptLines'] . ';',
		)
	)
);
?>
>
	<div class="wp-block-capitola-detailed-links__width alignwide <?= esc_attr( $capitola_animations['block-class'] ); ?>" <?= wp_kses_data( $animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
	</div>
</section>
