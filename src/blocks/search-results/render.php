<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\layout_conditionals;

global $wp_query;

$not_singular  = $wp_query->found_posts > 1 ? 'results' : 'result';
$search_string = get_query_var( 's', '' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'capitola-listings --paginated alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

?>
<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
	<div class="capitola-listings__width alignwide">
		<div class="capitola-listings__search-head">
			<?php if ( $attributes['headline'] ) : ?>
				<<?php echo tag_escape( $attributes['headlineTag'] ); ?> class="capitola-listings__search-headline --hl-l">
					<?php echo esc_html( $attributes['headline'] ); ?>
				</<?php echo tag_escape( $attributes['headlineTag'] ); ?>>
			<?php endif; ?>
			<form class="capitola-listings__search-form" action="/" autocomplete="off">
				<input type="search" name="s" value="<?php echo esc_attr( $search_string ? sanitize_text_field( $search_string ) : '' ); ?>" aria-label="search" placeholder="What are you looking for?"/>
				<button type="submit" class="search-icon" aria-label="submit search"></button>
			</form>
			<div class="capitola-listings__search-count">
				We found <?php echo esc_html( $wp_query->found_posts . ' ' . $not_singular ); ?> in your search.
			</div>
		</div>
		<div class="capitola-listings__list js-list --<?php echo esc_attr( $attributes['listLayout'] ); ?>" style="--capitola-excerpt-lines: <?php echo esc_attr( $attributes['excerptLines'] ); ?>;">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part(
						'template-parts/list-tiles/post',
						get_post_type(),
						array(
							'attributes'   => $attributes,
							'conditionals' => layout_conditionals( $attributes ),
						)
					);
				endwhile;
			endif;
			?>
		</div>
		<?php get_template_part( 'template-parts/pagination-search' ); ?>
	</div>
</section>
