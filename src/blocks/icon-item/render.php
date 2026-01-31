<div <?= wp_kses_data( get_block_wrapper_attributes() ) ?>>
	<div class="wp-block-cwps-icon-item__icon-wrapper">
		<div class="wp-block-cwps-icon-item__icon" style="--capitola-icon-image: url('<?= esc_url( get_stylesheet_directory_uri() ) ?>/assets/svgs/icons/<?= esc_attr( $attributes['icon'] ) ?>.svg');"></div>
		</div>
	<div class="wp-block-cwps-icon-item__title --hl-s">
		<?= esc_html( $attributes['title'] ) ?>
	</div>
	<p class="wp-block-cwps-icon-item__caption --micro-text">
		<?= esc_html( $attributes['caption'] ) ?>
	</p>
</div>
