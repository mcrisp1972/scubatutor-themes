<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<nav 
<?php
echo wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'alignfull anchor-menu js-anchorBar --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="wp-block-capitola-anchor-nav__width">
		<ul class="wp-block-capitola-anchor-nav__list">
			<?php echo wp_kses_post( $content ); ?>
		</ul>
	</div>
</nav>
