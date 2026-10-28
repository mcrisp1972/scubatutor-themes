<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\String_Helpers\render_link;

$wrapper_attributes = get_block_wrapper_attributes();

?>

<ul <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php foreach ( $attributes['links'] as $link_obj ) : ?>
		<?php $html = render_link( $link_obj, 'wp-block-capitola-link-list__link', false ); ?>
		<?php if ( $html ) : ?>
			<li class="wp-block-capitola-link-list__line">
				<?php echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>
