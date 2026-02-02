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
		)
	)
);
?>
>
	<div class="wp-block-capitola-icons__width alignwide --has-<?= esc_attr( $attributes['introAlign'] ); ?>-intro <?= $attributes['iconBackground'] ? ' --has-icon-background' : ''; ?> --item-align-<?= esc_attr( $attributes['textAlignment'] ); ?> <?= esc_attr( $capitola_animations['block-class'] ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
	</div>
</section>
