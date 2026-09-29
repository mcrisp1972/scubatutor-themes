<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$svgs = \Capitola\Blocks\Svg_List\list_svgs( 'assets/svgs' );

$list = array();

foreach ( $svgs['icons'] as $file ) {
	$svg_title     = $file;
	$file          = str_replace( 'icons/', '', $file );
	$svg_title     = str_replace( '.svg', '', $svg_title );
	$svg_title     = str_replace( 'icons/', '', $svg_title );
	$svg_title     = str_replace( 'fa-', '', $svg_title );
	$svg_title     = str_replace( '-', ' ', $svg_title );
	$svg_title     = ucwords( $svg_title );
	$list[ $file ] = $svg_title;

}

?>

<section class="svg-list-block">
	<?php foreach ( $svgs as $key => $svg ) : ?>
		<?php if ( is_array( $svg ) ) : ?>
		<h2><?php echo esc_html( $key ); ?></h2>
		<div class="svg-list__list">
			<?php foreach ( $svg as $svg2 ) : ?>
			<div class="svg-list__item">
				<img src="<?php echo wp_kses_post( CAPITOLA_THEME_URL . '/assets/svgs/' . $svg2 ); ?>"/>
				<p><?php echo esc_html( basename( $svg2 ) ); ?></p>
			</div>
		<?php endforeach; ?>
		</div>
	<?php endif; ?>
	<?php endforeach; ?>
</section>
